import { Contract } from "@hyperledger/fabric-gateway";
import { TextDecoder } from 'util';
import { RespsToUserCenterEntities, UserCenter } from "../../../domain/entity/user-center.entity";
import { UserCenterRepository } from "../../../domain/repository/user-center.repository";

export class UserCenterHyperledger implements UserCenterRepository {
  utf8Decoder = new TextDecoder();

  constructor(private contract: Contract) { }

  async list(userId: number): Promise<UserCenter[]> {
    const resultBytes = await this.contract.evaluateTransaction(
      'GetAll',
      '' + userId
    );
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return RespsToUserCenterEntities(result);
  }

  async save(entity: UserCenter): Promise<number> {
    const data = await this.contract.submitTransaction(
      'Create',
      '' + entity.usuario,
      '' + entity.centro,
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