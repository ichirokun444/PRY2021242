import { RolSave } from "../dto/rol.save";
import { RolUpdate } from "../dto/rol.update";
import { RolVO } from "../vo/rol.vo";

export interface RolUsecase {
  save(save: RolSave): Promise<number>;
  list(): Promise<RolVO[]>;
  update(rol: RolUpdate): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  get(code: string): Promise<RolVO>;
}