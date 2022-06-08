import { EspecialidadSave } from "../dto/especialidad.save";
import { EspecialidadUpdate } from "../dto/especialidad.update";
import { EspecialidadVO } from "../vo/especialidad.vo";

export interface EspecialidadUsecase {
  save(save: EspecialidadSave): Promise<number>;
  list(): Promise<EspecialidadVO[]>;
  update(especialidad: EspecialidadUpdate): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  get(code: string): Promise<EspecialidadVO>;
}