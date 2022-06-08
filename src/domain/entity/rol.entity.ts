export interface Rol {
  id: number;
  code: string;
  nombre: string;
}

export function RespToRolEntity(resp: any): Rol {
  return {
    id: +resp.id,
    code: resp.code,
    nombre: resp.nombre
  }
}

export function RespsToRolEntities(resps: any[]): Rol[] {
  return resps.map(it => RespToRolEntity(it));
}