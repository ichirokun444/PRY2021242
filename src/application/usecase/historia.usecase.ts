import { CenterSave } from "../../domain/dto/center.save";
import { HistoriaSave } from "../../domain/dto/historia.save";
import { HistoriaUpdate } from "../../domain/dto/historia.update";
import { Center } from "../../domain/entity/center.entity";
import { Historia } from "../../domain/entity/historia.entity";
import { CenterRepository } from "../../domain/repository/center.repository";
import { HistoriaRepository } from "../../domain/repository/historia.repository";
import { HistoriaUsecase } from "../../domain/usecase/historia.usecase";
import { CenterEntitiesToCenterVOs, CenterEntityToCenterVO, CenterVO } from "../../domain/vo/center.vo";
import { HistoriaEntitiesToHistoriaVOs, HistoriaEntityToHistoriaVO, HistoriaVO } from "../../domain/vo/historia.vo";

export class HistoriaUseCaseImpl implements HistoriaUsecase {
  constructor(private repo: HistoriaRepository) { }

  save(save: HistoriaSave): Promise<number> {
    const entity: Historia = {
      antecedentes: save.antecedentes,
      code: save.code,
      diagnostico: save.diagnostico,
      examenes: save.examenes,
      fecha: save.fecha,
      id: 0,
      medico: save.medico,
      paciente: save.paciente,
      tratamiento: save.tratamiento,
    }

    return this.repo.save(entity)
  }

  async list(): Promise<HistoriaVO[]> {
    const entities = await this.repo.list();
    return HistoriaEntitiesToHistoriaVOs(entities);
  }

  async get(code: string): Promise<HistoriaVO> {
    const entity = await this.repo.get(code)
    return HistoriaEntityToHistoriaVO(entity);
  }


  update(historia: HistoriaUpdate): Promise<boolean> {
    const userE: Historia = {
      id: +historia.id,
      code: historia.code,
      antecedentes: historia.antecedentes,
      diagnostico: historia.diagnostico,
      examenes: historia.examenes,
      fecha: historia.fecha,
      medico: historia.medico,
      paciente: historia.paciente,
      tratamiento: historia.tratamiento
    }

    return this.repo.update(userE)
  }

  delete(id: string): Promise<boolean> {
    return this.repo.delete(id)
  }
}