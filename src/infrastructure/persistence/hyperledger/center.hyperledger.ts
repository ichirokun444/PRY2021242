import { Contract } from "@hyperledger/fabric-gateway";
import { TextDecoder } from 'util';
import { Center, RespsToCenterEntities, RespToCenterEntity } from "../../../domain/entity/center.entity";
import { RespToRolEntity, Rol } from "../../../domain/entity/rol.entity";
import { CenterRepository } from "../../../domain/repository/center.repository";

export class CenterHyperledger implements CenterRepository {
  utf8Decoder = new TextDecoder();

  constructor(private contract: Contract) { }

  async init(): Promise<void> {
    await this.contract.submitTransaction('InitLedger');
  }

  async list(): Promise<Center[]> {
    const resultBytes = await this.contract.evaluateTransaction('GetAllCenters');
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return RespsToCenterEntities(result);
  }

  async get(code: string): Promise<Center> {
    const resultBytes = await this.contract.evaluateTransaction('ReadCenter', code);
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return RespToCenterEntity(result);
  }

  save(center: Center): Promise<number> {
    console.log('\n--> Submit Transaction: Save User');

    return new Promise((res, rej) => {
      this.contract.submitTransaction(
        'CreateCenter',
        center.code,
        center.nombre,
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


  update(center: Center): Promise<boolean> {
    console.log('\n--> Submit Transaction: Update Center');

    return new Promise((res, rej) => {
      this.contract.submitTransaction(
        'Update',
        String(center.id),
        center.code,
        center.nombre
      ).then((data) => res(true))
        .catch(err => {
          rej(err);
        })
    })

  }


  delete(id: string): Promise<boolean> {
    console.log('\n--> Submit Transaction: Delete Center');

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