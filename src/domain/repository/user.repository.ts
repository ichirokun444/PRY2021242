import { User } from "../entity/user.entity";

export interface UserRepository {
  list(): Promise<User[]>;
  get(dni: string): Promise<User>;
  save(user: User): Promise<number>;
  update(user: User): Promise<boolean>;
  updatePassword(id: string, oldpassword: string, password: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  login(username: string, password: string): Promise<User>;
}