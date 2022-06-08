import { Center } from "../entity/center.entity";

export interface CenterVO {
  id: string;
  code: string;
  nombre: string;
}

export function CenterEntityToCenterVO(entity: Center): CenterVO {
  return {
    id: '' + entity.id,
    code: entity.code,
    nombre: entity.nombre
  }
}

export function CenterEntitiesToCenterVOs(entities: Center[]): CenterVO[] {
  return entities.map(it => CenterEntityToCenterVO(it));
}