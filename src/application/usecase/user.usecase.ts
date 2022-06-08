import { UserPasswordUpdate } from "../../domain/dto/user-password.update";
import { UserStatusUpdate } from "../../domain/dto/user-status.update";
import { UserSave } from "../../domain/dto/user.save";
import { UserUpdate } from "../../domain/dto/user.update";
import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserUsecase } from "../../domain/usecase/user.usecase";
import { UserEntitiesToUserVOs, UserEntityToUserVO, UserVO } from "../../domain/vo/user.vo";

export class UserUseCaseImpl implements UserUsecase {
  constructor(private repo: UserRepository) { }

  async updateStatusUser(user: UserStatusUpdate): Promise<boolean> {
    const userE = await this.repo.get(user.id)
    userE.status = user.status
    return this.repo.update(userE);
  }

  async updatePassword(user: UserPasswordUpdate): Promise<boolean> {
    return this.repo.updatePassword(user.id, user.oldpassword, user.password);
  }

  async getUser(dni: string): Promise<UserVO> {
    const user = await this.repo.get(dni)
    return UserEntityToUserVO(user);
  }

  async login(username: string, password: string): Promise<UserVO> {
    const user = await this.repo.login(username, password)
    return UserEntityToUserVO(user);
  }

  saveUser(save: UserSave): Promise<number> {
    const userE: User = {
      id: 0,
      dni: save.dni,
      apellidos: save.apellidos,
      correo: save.correo,
      direccion: save.direccion,
      status: 'E',
      fecha_nac: save.fecha_nac,
      especialidad: save.especialidad,
      genero: save.genero,
      nombres: save.nombres,
      num_telefonico: save.num_telefonico,
      password: 'contrasena',
      rol: save.rol
    }

    return this.repo.save(userE)
  }

  updateUser(save: UserUpdate): Promise<boolean> {
    const userE: User = {
      id: +save.id,
      dni: save.dni,
      apellidos: save.apellidos,
      correo: save.correo,
      direccion: save.direccion,
      fecha_nac: save.fecha_nac,
      genero: save.genero,
      nombres: save.nombres,
      status: save.status,
      num_telefonico: save.num_telefonico,
      password: '',
      rol: save.rol,
      especialidad: save.especialidad
    }

    console.log(userE)
    return this.repo.update(userE)
  }

  delete(id: string): Promise<boolean> {
    return this.repo.delete(id)
  }

  async listUser(): Promise<UserVO[]> {
    const users = await this.repo.list();
    return UserEntitiesToUserVOs(users);
  }
}