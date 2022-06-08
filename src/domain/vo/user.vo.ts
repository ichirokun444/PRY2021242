import { User } from "../entity/user.entity";

export interface UserVO {
  id: string;
  dni: string;
  nombres: string;
  apellidos: string;
  correo: string;
  direccion: string;
  genero: string;
  fecha_nac: string;
  num_telefonico: string;
  status: string;
  rol: string;
  especialidad?: string;
}

export function UserEntityToUserVO(entity: User): UserVO {
  return {
    id: '' + entity.id,
    dni: entity.dni,
    apellidos: entity.apellidos,
    correo: entity.correo,
    nombres: entity.nombres,
    status: entity.status,
    rol: '' + entity.rol,
    direccion: entity.direccion,
    genero: entity.genero,
    especialidad: entity.especialidad ? '' + entity.especialidad : '',
    fecha_nac: entity.fecha_nac.split('T')[0],
    num_telefonico: entity.num_telefonico,
  }
}

export function UserEntitiesToUserVOs(entities: User[]): UserVO[] {
  return entities.map(it => UserEntityToUserVO(it));
}