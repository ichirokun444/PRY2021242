import { UserPasswordUpdate } from "../dto/user-password.update";
import { UserStatusUpdate } from "../dto/user-status.update";
import { UserSave } from "../dto/user.save";
import { UserUpdate } from "../dto/user.update";
import { UserVO } from "../vo/user.vo";

export interface UserUsecase {
  saveUser(save: UserSave): Promise<number>;
  updateUser(user: UserUpdate): Promise<boolean>;
  updateStatusUser(user: UserStatusUpdate): Promise<boolean>;
  updatePassword(user: UserPasswordUpdate): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  listUser(): Promise<UserVO[]>;
  getUser(dni: string): Promise<UserVO>;
  login(username: string, password: string): Promise<UserVO>;
}