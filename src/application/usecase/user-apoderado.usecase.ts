import { UserApoderadoSave } from "../../domain/dto/user-apoderado.save";
import { UserApoderado } from "../../domain/entity/user-apoderado.entity";
import { UserApoderadoRepository } from "../../domain/repository/user-apoderado.repository";
import { UserApoderadoUsecase } from "../../domain/usecase/user-apoderado.usecase";
import { UserApoderadoEntitiesToUserApoderadoVOs, UserApoderadoVO } from "../../domain/vo/user-apoderado.vo";

export class UserApoderadoUseCaseImpl implements UserApoderadoUsecase {
  constructor(private repo: UserApoderadoRepository) { }

  save(save: UserApoderadoSave): Promise<number> {
    const entity: UserApoderado = {
      id: 0,
      usuario: save.usuario,
      apoderado: save.apoderado
    }

    return this.repo.save(entity)
  }

  delete(id: string): Promise<boolean> {
    return this.repo.delete(id)
  }

  async list(userId: number): Promise<UserApoderadoVO[]> {
    const entities = await this.repo.list(userId);
    return UserApoderadoEntitiesToUserApoderadoVOs(entities);
  }

  async listPoderdante(userId: number): Promise<UserApoderadoVO[]> {
    const entities = await this.repo.listPoderdante(userId);
    return UserApoderadoEntitiesToUserApoderadoVOs(entities);
  }

}