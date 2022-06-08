import { Rol } from "../entity/rol.entity";

export interface RolRepository {
  list(): Promise<Rol[]>;
  get(code: string): Promise<Rol>;
  save(rol: Rol): Promise<number>;
  update(rol: Rol): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}