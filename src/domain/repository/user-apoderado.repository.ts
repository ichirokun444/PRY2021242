import { UserApoderado } from "../entity/user-apoderado.entity";

export interface UserApoderadoRepository {
  list(userId: number): Promise<UserApoderado[]>;
  listPoderdante(userId: number): Promise<UserApoderado[]>;
  save(entity: UserApoderado): Promise<number>;
  delete(id: string): Promise<boolean>;
}