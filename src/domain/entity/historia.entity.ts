export interface Historia {
  id: number;
  code: string;
  diagnostico: string;
  antecedentes: string;
  tratamiento: string;
  examenes: string;
  fecha: string;
  medico: number;
  paciente: number;
}


export function HistoriaRespToHistoriaEntity(resp: any): Historia {
  return {
    id: +resp.id,
    antecedentes: resp.antecedentes,
    code: resp.code,
    diagnostico: resp.diagnostico,
    examenes: resp.examenes,
    fecha: resp.fecha,
    medico: +resp.medico,
    paciente: +resp.paciente,
    tratamiento: resp.tratamiento
  }
}

export function HistoriaRespsToHistorias(resps: any[]): Historia[] {
  return resps.map(it => HistoriaRespToHistoriaEntity(it));
}