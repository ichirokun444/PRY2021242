import { Center } from "../entity/center.entity";

export interface CenterRepository {
  list(): Promise<Center[]>;
  get(code: string): Promise<Center>;
  save(center: Center): Promise<number>;
  update(center: Center): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}