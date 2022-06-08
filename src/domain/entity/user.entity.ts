export interface User {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  correo: string;
  password: string;
  fecha_nac: string;
  genero: string;
  direccion: string;
  num_telefonico: string;
  status: string;
  rol: number;
  especialidad?: number;
}


export function UserRespToUserEntity(resp: any): User {
  console.log(resp);
  return {
    id: +resp.id,
    dni: resp.dni,
    apellidos: resp.apellidos,
    correo: resp.correo,
    nombres: resp.nombres,
    rol: +resp.idRol,
    genero: resp.genero,
    status: resp.status,
    num_telefonico: resp.numTelefonico,
    password: resp.password,
    direccion: resp.direccion,
    especialidad: resp.especialidad,
    fecha_nac: resp.fechaNac.split('T')[0]
  }
}

export function UserRespsToUsers(resps: any[]): User[] {
  return resps.map(it => UserRespToUserEntity(it));
}