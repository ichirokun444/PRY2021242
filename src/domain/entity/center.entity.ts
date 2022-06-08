export interface Center {
  id: number;
  code: string;
  nombre: string;
}


export function RespToCenterEntity(resp: any): Center {
  return {
    id: +resp.id,
    code: resp.code,
    nombre: resp.nombre
  }
}

export function RespsToCenterEntities(resps: any[]): Center[] {
  return resps.map(it => RespToCenterEntity(it));
}