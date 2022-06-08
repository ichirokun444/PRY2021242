import { RolSave } from "../../domain/dto/rol.save";
import { RolUpdate } from "../../domain/dto/rol.update";
import { Rol } from "../../domain/entity/rol.entity";
import { RolRepository } from "../../domain/repository/rol.repository";
import { RolEntitiesToRolVOs, RolEntityToRolVO, RolVO } from "../../domain/vo/rol.vo";

export class RolUseCaseImpl implements RolUseCaseImpl {
  constructor(private repo: RolRepository) { }

  save(save: RolSave): Promise<number> {
    const entity: Rol = {
      id: 0,
      code: save.code,
      nombre: save.name
    }

    return this.repo.save(entity)
  }

  update(rol: RolUpdate): Promise<boolean> {
    const userE: Rol = {
      id: +rol.id,
      code: rol.code,
      nombre: rol.name
    }

    return this.repo.update(userE)
  }

  delete(id: string): Promise<boolean> {
    return this.repo.delete(id)
  }

  async list(): Promise<RolVO[]> {
    const entities = await this.repo.list();
    return RolEntitiesToRolVOs(entities);
  }

  async get(code: string): Promise<RolVO> {
    const entity = await this.repo.get(code)
    return RolEntityToRolVO(entity);
  }

}