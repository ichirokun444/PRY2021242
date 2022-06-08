import { CenterSave } from "../../domain/dto/center.save";
import { CenterUpdate } from "../../domain/dto/center.update";
import { Center } from "../../domain/entity/center.entity";
import { CenterRepository } from "../../domain/repository/center.repository";
import { CenterEntitiesToCenterVOs, CenterEntityToCenterVO, CenterVO } from "../../domain/vo/center.vo";

export class CenterUseCaseImpl implements CenterUseCaseImpl {
  constructor(private repo: CenterRepository) { }

  save(save: CenterSave): Promise<number> {
    const entity: Center = {
      id: 0,
      code: save.code,
      nombre: save.name
    }

    return this.repo.save(entity)
  }

  update(center: CenterUpdate): Promise<boolean> {
    const userE: Center = {
      id: +center.id,
      code: center.code,
      nombre: center.name
    }

    return this.repo.update(userE)
  }

  delete(id: string): Promise<boolean> {
    return this.repo.delete(id)
  }

  async list(): Promise<CenterVO[]> {
    const entities = await this.repo.list();
    return CenterEntitiesToCenterVOs(entities);
  }

  async get(code: string): Promise<CenterVO> {
    const entity = await this.repo.get(code)
    return CenterEntityToCenterVO(entity);
  }

}