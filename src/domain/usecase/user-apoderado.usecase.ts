import { UserApoderadoSave } from "../dto/user-apoderado.save";
import { UserApoderadoVO } from "../vo/user-apoderado.vo";

export interface UserApoderadoUsecase {
  save(save: UserApoderadoSave): Promise<number>;
  list(userId: number): Promise<UserApoderadoVO[]>;
  listPoderdante(userId: number): Promise<UserApoderadoVO[]>;
  delete(id: string): Promise<boolean>;
}