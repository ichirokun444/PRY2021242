import { EspecialidadSave } from "../../domain/dto/especialidad.save";
import { EspecialidadUpdate } from "../../domain/dto/especialidad.update";
import { Especialidad } from "../../domain/entity/especialidad.usecase";
import { EspecialidadRepository } from "../../domain/repository/especialidad.repository";
import { EspecialidadUsecase } from "../../domain/usecase/especialidad.usecase";
import { EspecialidadEntitiesToEspecialidadVOs, EspecialidadEntityToEspecialidadVO, EspecialidadVO } from "../../domain/vo/especialidad.vo";

export class EspecialidadUseCaseImpl implements EspecialidadUsecase {
  constructor(private repo: EspecialidadRepository) { }

  save(save: EspecialidadSave): Promise<number> {
    const entity: Especialidad = {
      id: 0,
      code: save.code,
      nombre: save.name
    }

    return this.repo.save(entity)
  }

  update(especialidad: EspecialidadUpdate): Promise<boolean> {
    const userE: Especialidad = {
      id: +especialidad.id,
      code: especialidad.code,
      nombre: especialidad.name
    }

    return this.repo.update(userE)
  }

  delete(id: string): Promise<boolean> {
    return this.repo.delete(id)
  }

  async list(): Promise<EspecialidadVO[]> {
    const entities = await this.repo.list();
    return EspecialidadEntitiesToEspecialidadVOs(entities);
  }

  async get(code: string): Promise<EspecialidadVO> {
    const entity = await this.repo.get(code)
    return EspecialidadEntityToEspecialidadVO(entity);
  }

}