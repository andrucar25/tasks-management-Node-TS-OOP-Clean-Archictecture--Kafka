import { err, ok } from "neverthrow";

import db from "../bootstrap/postgreSQL";
import { User } from '../../domain/entities/user';
import { UserListResult,
  UserPageResult,
  UserRepository,
  UserResult } from '../../domain/repositories/user.repository';
import { UserEntity } from "../db-persistence/user.entity";
import { UserDatabaseException } from "../exceptions/user-database.exception";
import { UserSaveDto } from "../dtos/user-save.dto";

export class UserRepositoryImpl implements UserRepository {
  async save(user: User): Promise<UserResult> {
    const repository = db.getDataSource().getRepository(UserEntity);
    
    try {
      console.log("🚀 ~ user:", user)
      await repository.save(UserSaveDto.fromDomainToData(user));
      return ok(user);
    } catch (error) {
      return err(new UserDatabaseException(error.message));
    }
  }

  update(user: User): Promise<UserResult> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<UserListResult> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<UserResult> {
    throw new Error("Method not implemented.");
  }
  getByPage(page: number, size: number): Promise<UserPageResult> {
    throw new Error("Method not implemented.");
  }
  getByEmail(id: string): Promise<UserResult> {
    throw new Error("Method not implemented.");
  }

}