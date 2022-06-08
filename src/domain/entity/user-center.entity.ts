export interface UserCenter {
  id: number;
  usuario: number;
  centro: number;
}


export function RespToUserCenterEntity(resp: any): UserCenter {
  return {
    id: +resp.id,
    centro: resp.centro,
    usuario: resp.usuario,
  }
}

export function RespsToUserCenterEntities(resps: any[]): UserCenter[] {
  return resps.map(it => RespToUserCenterEntity(it));
}
