import { Contract } from "@hyperledger/fabric-gateway";
import { TextDecoder } from 'util';
import { RespsToRolEntities, RespToRolEntity, Rol } from "../../../domain/entity/rol.entity";
import { RolRepository } from "../../../domain/repository/rol.repository";

export class RolHyperledger implements RolRepository {
  utf8Decoder = new TextDecoder();

  constructor(private contract: Contract) { }

  async init(): Promise<void> {
    await this.contract.submitTransaction('InitLedger');
  }

  async list(): Promise<Rol[]> {
    const resultBytes = await this.contract.evaluateTransaction('GetAllRoles');
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return RespsToRolEntities(result);
  }

  async get(code: string): Promise<Rol> {
    const resultBytes = await this.contract.evaluateTransaction('ReadRol', code);
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return RespToRolEntity(result);
  }

  save(code: Rol): Promise<number> {
    console.log('\n--> Submit Transaction: Save User');

    return new Promise((res, rej) => {
      this.contract.submitTransaction(
        'CreateRol',
        code.code,
        code.nombre,
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

  update(rol: Rol): Promise<boolean> {
    console.log('\n--> Submit Transaction: Update Rol');

    return new Promise((res, rej) => {
      this.contract.submitTransaction(
        'Update',
        String(rol.id),
        rol.code,
        rol.nombre
      ).then((data) => res(true))
        .catch(err => {
          rej(err);
        })
    })

  }


  delete(id: string): Promise<boolean> {
    console.log('\n--> Submit Transaction: Delete Rol');

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