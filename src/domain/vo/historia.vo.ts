import { Historia } from "../entity/historia.entity";

export interface HistoriaVO {
  id: string;
  code: string;
  diagnostico: string;
  antecedentes: string;
  tratamiento: string;
  examenes: string;
  fecha: string;
  medico: string;
  paciente: string;
}

export function HistoriaEntityToHistoriaVO(entity: Historia): HistoriaVO {
  return {
    id: '' + entity.id,
    code: entity.code,
    antecedentes: entity.antecedentes,
    diagnostico: entity.diagnostico,
    examenes: entity.examenes,
    fecha: entity.fecha.replace('T', ' ').replace('Z', '').split('.')[0],
    medico: '' + entity.medico,
    paciente: '' + entity.paciente,
    tratamiento: entity.tratamiento,
  }
}

export function HistoriaEntitiesToHistoriaVOs(entities: Historia[]): HistoriaVO[] {
  return entities.map(it => HistoriaEntityToHistoriaVO(it));
}