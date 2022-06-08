import { UserCenter } from "../entity/user-center.entity";

export interface UserCenterRepository {
  list(userId: number): Promise<UserCenter[]>;
  save(entity: UserCenter): Promise<number>;
  delete(id: string): Promise<boolean>;
}