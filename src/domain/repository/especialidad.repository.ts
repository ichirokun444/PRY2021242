import { Especialidad } from "../entity/especialidad.usecase";

export interface EspecialidadRepository {
  list(): Promise<Especialidad[]>;
  get(code: string): Promise<Especialidad>;
  save(especialidad: Especialidad): Promise<number>;
  update(especialidad: Especialidad): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}