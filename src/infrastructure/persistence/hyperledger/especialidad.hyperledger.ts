import { Contract } from "@hyperledger/fabric-gateway";
import { TextDecoder } from 'util';
import { Especialidad, RespsToEspecialidadEntities, RespToEspecialidadEntity } from "../../../domain/entity/especialidad.usecase";
import { EspecialidadRepository } from "../../../domain/repository/especialidad.repository";

export class EspecialidadHyperledger implements EspecialidadRepository {
  utf8Decoder = new TextDecoder();

  constructor(private contract: Contract) { }

  async init(): Promise<void> {
    await this.contract.submitTransaction('InitLedger');
  }

  async list(): Promise<Especialidad[]> {
    const resultBytes = await this.contract.evaluateTransaction('GetAll');
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return RespsToEspecialidadEntities(result);
  }

  async get(code: string): Promise<Especialidad> {
    const resultBytes = await this.contract.evaluateTransaction('Read', code);
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return RespToEspecialidadEntity(result);
  }

  save(especialidad: Especialidad): Promise<number> {
    console.log('\n--> Submit Transaction: Save User');

    return new Promise((res, rej) => {
      this.contract.submitTransaction(
        'Create',
        especialidad.code,
        especialidad.nombre,
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


  update(especialidad: Especialidad): Promise<boolean> {
    console.log('\n--> Submit Transaction: Update Especialidad');

    return new Promise((res, rej) => {
      this.contract.submitTransaction(
        'Update',
        String(especialidad.id),
        especialidad.code,
        especialidad.nombre
      ).then((data) => res(true))
        .catch(err => {
          rej(err);
        })
    })

  }


  delete(id: string): Promise<boolean> {
    console.log('\n--> Submit Transaction: Delete Especialidad');

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