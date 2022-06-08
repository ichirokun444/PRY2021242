export interface UserApoderado {
  id: number;
  usuario: number;
  apoderado: number;
}


export function RespToUserCenterEntity(resp: any): UserApoderado {
  return {
    id: +resp.id,
    apoderado: resp.apoderado,
    usuario: resp.usuario,
  }
}

export function RespsToUserApoderadoEntities(resps: any[]): UserApoderado[] {
  return resps.map(it => RespToUserCenterEntity(it));
}