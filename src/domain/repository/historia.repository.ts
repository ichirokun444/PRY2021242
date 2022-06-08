import { Historia } from "../entity/historia.entity";

export interface HistoriaRepository {
  list(): Promise<Historia[]>;
  get(code: string): Promise<Historia>;
  save(historia: Historia): Promise<number>;
  update(historia: Historia): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}