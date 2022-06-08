import { UserCenterSave } from "../../domain/dto/user-center.save";
import { UserCenter } from "../../domain/entity/user-center.entity";
import { UserCenterRepository } from "../../domain/repository/user-center.repository";
import { UserCenterUsecase } from "../../domain/usecase/user-center.usecase";
import { UserCenterEntitiesToUserCenterVOs, UserCenterVO } from "../../domain/vo/user-center.vo";

export class UserCenterUseCaseImpl implements UserCenterUsecase {
  constructor(private repo: UserCenterRepository) { }

  save(save: UserCenterSave): Promise<number> {
    const entity: UserCenter = {
      id: 0,
      centro: save.centro,
      usuario: save.usuario
    }

    return this.repo.save(entity)
  }

  delete(id: string): Promise<boolean> {
    return this.repo.delete(id)
  }

  async list(userId: number): Promise<UserCenterVO[]> {
    const entities = await this.repo.list(userId);
    return UserCenterEntitiesToUserCenterVOs(entities);
  }

}