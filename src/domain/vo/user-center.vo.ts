import { UserCenter } from "../entity/user-center.entity";

export interface UserCenterVO {
  id: string;
  usuario: string;
  centro: string;
}

export function CenterEntityToCenterVO(entity: UserCenter): UserCenterVO {
  return {
    id: '' + entity.id,
    centro: '' + entity.centro,
    usuario: '' + entity.usuario
  }
}

export function UserCenterEntitiesToUserCenterVOs(entities: UserCenter[]): UserCenterVO[] {
  return entities.map(it => CenterEntityToCenterVO(it));
}