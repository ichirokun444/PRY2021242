import { Contract } from "@hyperledger/fabric-gateway";
import { TextDecoder } from 'util';
import { RespsToUserApoderadoEntities, UserApoderado } from "../../../domain/entity/user-apoderado.entity";
import { UserApoderadoRepository } from "../../../domain/repository/user-apoderado.repository";

export class UserApoderadoHyperledger implements UserApoderadoRepository {
  utf8Decoder = new TextDecoder();

  constructor(private contract: Contract) { }

  async list(userId: number): Promise<UserApoderado[]> {
    const resultBytes = await this.contract.evaluateTransaction(
      'GetAll',
      '' + userId
    );
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return RespsToUserApoderadoEntities(result);
  }

  async listPoderdante(userId: number): Promise<UserApoderado[]> {
    const resultBytes = await this.contract.evaluateTransaction(
      'GetAllPoderdantes',
      '' + userId
    );
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return RespsToUserApoderadoEntities(result);
  }

  async save(entity: UserApoderado): Promise<number> {
    const data = await this.contract.submitTransaction(
      'Create',
      '' + entity.usuario,
      '' + entity.apoderado,
    );

    const jsonString = Buffer.from(data).toString('utf8')
    const parsedData = JSON.parse(jsonString)
    console.log(parsedData.id);
    return +parsedData.id;
  }

  async delete(id: string): Promise<boolean> {
    console.log('\n--> Submit Transaction: Delete User');
    await this.contract.submitTransaction(
      'Delete',
      id,
    );

    return true
  }

  async init(): Promise<void> {
    await this.contract.submitTransaction('InitLedger');
  }

}