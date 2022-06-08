import { Contract } from "@hyperledger/fabric-gateway";
import { TextDecoder } from 'util';
import { Historia, HistoriaRespsToHistorias, HistoriaRespToHistoriaEntity } from "../../../domain/entity/historia.entity";
import { HistoriaRepository } from "../../../domain/repository/historia.repository";

export class HistoriaHyperledger implements HistoriaRepository {
  utf8Decoder = new TextDecoder();

  constructor(private contract: Contract) { }

  async init(): Promise<void> {
    await this.contract.submitTransaction('InitLedger');
  }

  async list(): Promise<Historia[]> {
    const resultBytes = await this.contract.evaluateTransaction('GetAll');
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return HistoriaRespsToHistorias(result);
  }

  async get(code: string): Promise<Historia> {
    const resultBytes = await this.contract.evaluateTransaction('Read', code);
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return HistoriaRespToHistoriaEntity(result);
  }

  save(center: Historia): Promise<number> {
    console.log('\n--> Submit Transaction: Save User');

    return new Promise((res, rej) => {
      this.contract.submitTransaction(
        'Create',
        center.code,
        center.diagnostico,
        center.antecedentes,
        center.tratamiento,
        center.examenes,
        center.fecha,
        '' + center.medico,
        '' + center.paciente,
      ).then((data) => {
        const jsonString = Buffer.from(data).toString('utf8')
        const parsedData = JSON.parse(jsonString)
        console.log(parsedData.id), res(+parsedData.id);
      })
        .catch(err => {
          rej(err);
        })
    })

  }


  update(historia: Historia): Promise<boolean> {
    console.log('\n--> Submit Transaction: Update Historia');

    return new Promise((res, rej) => {
      this.contract.submitTransaction(
        'Update',
        String(historia.id),
        historia.code,
        historia.diagnostico,
        historia.antecedentes,
        historia.tratamiento,
        historia.examenes,
        historia.fecha,
        '' + historia.medico,
        '' + historia.paciente,
      ).then((data) => res(true))
        .catch(err => {
          rej(err);
        })
    })

  }


  delete(id: string): Promise<boolean> {
    console.log('\n--> Submit Transaction: Delete Historia');

    return new Promise((res, rej) => {
      this.contract.submitTransaction(
        'Delete',
        id,
      ).then((data) => res(true))
        .catch(err => {
          rej(err);
        })
    })
  }
}