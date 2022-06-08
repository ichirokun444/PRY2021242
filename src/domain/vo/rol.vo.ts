import { Rol } from "../entity/rol.entity";

export interface RolVO {
  id: string;
  code: string;
  nombre: string;
}

export function RolEntityToRolVO(entity: Rol): RolVO {
  return {
    id: '' + entity.id,
    code: entity.code,
    nombre: entity.nombre
  }
}

export function RolEntitiesToRolVOs(entities: Rol[]): RolVO[] {
  return entities.map(it => RolEntityToRolVO(it));
}