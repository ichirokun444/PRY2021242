import { Especialidad } from "../entity/especialidad.usecase";

export interface EspecialidadVO {
  id: string;
  code: string;
  nombre: string;
}

export function EspecialidadEntityToEspecialidadVO(entity: Especialidad): EspecialidadVO {
  return {
    id: '' + entity.id,
    code: entity.code,
    nombre: entity.nombre
  }
}

export function EspecialidadEntitiesToEspecialidadVOs(entities: Especialidad[]): EspecialidadVO[] {
  return entities.map(it => EspecialidadEntityToEspecialidadVO(it));
}