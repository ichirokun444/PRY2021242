import { Contract } from "@hyperledger/fabric-gateway";
import { TextDecoder } from 'util';
import { User, UserRespsToUsers, UserRespToUserEntity } from "../../../domain/entity/user.entity";
import { UserRepository } from "../../../domain/repository/user.repository";

export class UserHyperledger implements UserRepository {
  utf8Decoder = new TextDecoder();

  constructor(private contract: Contract) { }
  async updatePassword(id: string, oldpassword: string, password: string): Promise<boolean> {
    await this.contract.submitTransaction(
      'UpdatePassword',
      id,
      oldpassword,
      password
    );
    return true;
  }

  async init(): Promise<void> {
    await this.contract.submitTransaction('InitLedger');
  }

  async login(username: string, password: string): Promise<User> {
    const resultBytes = await this.contract.evaluateTransaction('Login', username, password);
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return UserRespToUserEntity(result);
  }

  async list(): Promise<User[]> {
    const resultBytes = await this.contract.evaluateTransaction('GetAllUsers');
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return UserRespsToUsers(result);
  }

  async get(dni: string): Promise<User> {
    const resultBytes = await this.contract.evaluateTransaction('ReadUser', dni);
    const resultJson = this.utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return UserRespToUserEntity(result);
  }

  async save(user: User): Promise<number> {
    console.log('\n--> Submit Transaction: Save User');

    const data = await this.contract.submitTransaction(
      'CreateUser',
      user.dni,
      user.nombres,
      user.apellidos,
      user.correo,
      user.password,
      user.fecha_nac,
      user.genero,
      user.direccion,
      user.num_telefonico,
      String(user.rol),
      String(user.especialidad ? user.especialidad : 0),
    );
    const jsonString = Buffer.from(data).toString('utf8')
    const parsedData = JSON.parse(jsonString)
    console.log(parsedData.id);
    return +parsedData.id;
  }

  async update(user: User): Promise<boolean> {
    console.log('\n--> Submit Transaction: Update User');
    const especialidad = !user.especialidad ? '' : String(user.especialidad);
    const userRol = !user.rol ? '0' : String(user.rol);

    await this.contract.submitTransaction(
      'Update',
      String(user.id),
      user.dni,
      user.nombres,
      user.apellidos,
      user.correo,
      user.password,
      user.fecha_nac,
      user.genero,
      user.direccion,
      user.num_telefonico,
      userRol,
      user.status,
      especialidad,
    );
    return true;
  }


  async delete(id: string): Promise<boolean> {
    console.log('\n--> Submit Transaction: Delete User');
    await this.contract.submitTransaction(
      'Delete',
      id,
    );

    return true
  }
}