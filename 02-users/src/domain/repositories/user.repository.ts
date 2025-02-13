import { Result } from "neverthrow";

import { User } from "../entities/user";

export type UserResult = Result<User, Error>;
export interface UserRepository {
  save(user: User): Promise<UserResult>;
  getByEmail(id: string): Promise<UserResult>;
}