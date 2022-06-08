import { CenterSave } from "../dto/center.save";
import { CenterUpdate } from "../dto/center.update";
import { CenterVO } from "../vo/center.vo";

export interface CenterUsecase {
  save(save: CenterSave): Promise<number>;
  list(): Promise<CenterVO[]>;
  update(center: CenterUpdate): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  get(code: string): Promise<CenterVO>;
}