export interface Especialidad {
  id: number;
  code: string;
  nombre: string;
}


export function RespToEspecialidadEntity(resp: any): Especialidad {
  return {
    id: +resp.id,
    code: resp.code,
    nombre: resp.nombre
  }
}

export function RespsToEspecialidadEntities(resps: any[]): Especialidad[] {
  return resps.map(it => RespToEspecialidadEntity(it));
}