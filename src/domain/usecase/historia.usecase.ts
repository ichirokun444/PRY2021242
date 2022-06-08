import { HistoriaSave } from "../dto/historia.save";
import { HistoriaUpdate } from "../dto/historia.update";
import { HistoriaVO } from "../vo/historia.vo";

export interface HistoriaUsecase {
  save(save: HistoriaSave): Promise<number>;
  list(): Promise<HistoriaVO[]>;
  update(historia: HistoriaUpdate): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  get(id: string): Promise<HistoriaVO>;
}