import { UserApoderado } from "../entity/user-apoderado.entity";

export interface UserApoderadoVO {
  id: string;
  usuario: string;
  apoderado: string;
}

export function CenterEntityToCenterVO(entity: UserApoderado): UserApoderadoVO {
  return {
    id: '' + entity.id,
    usuario: '' + entity.usuario,
    apoderado: '' + entity.apoderado
  }
}

export function UserApoderadoEntitiesToUserApoderadoVOs(entities: UserApoderado[]): UserApoderadoVO[] {
  return entities.map(it => CenterEntityToCenterVO(it));
}