import { UserCenterSave } from "../dto/user-center.save";
import { UserCenterVO } from "../vo/user-center.vo";

export interface UserCenterUsecase {
  save(save: UserCenterSave): Promise<number>;
  list(userId: number): Promise<UserCenterVO[]>;
  delete(id: string): Promise<boolean>;
}