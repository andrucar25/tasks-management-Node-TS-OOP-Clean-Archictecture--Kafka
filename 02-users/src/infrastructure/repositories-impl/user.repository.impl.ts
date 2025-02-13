import { err, ok } from "neverthrow";

import db from "../bootstrap/postgreSQL";
import { User } from '../../domain/entities/user';
import { UserRepository, UserResult } from '../../domain/repositories/user.repository';
import { UserEntity } from "../db-persistence/user.entity";
import { UserDatabaseException } from "../exceptions/user-database.exception";
import { UserSaveDto } from "../dtos/user-save.dto";
import { UserDto } from "../dtos/user.dto";

export class UserRepositoryImpl implements UserRepository {
  async save(user: User): Promise<UserResult> {
    const repository = db.getDataSource().getRepository(UserEntity);
    
    try {
      await repository.save(UserSaveDto.fromDomainToData(user));
      return ok(user);
    } catch (error) {
      return err(new UserDatabaseException(error.message));
    }
  }

  async getByEmail(email: string): Promise<UserResult> {
    const repository = db.getDataSource().getRepository(UserEntity);
    
    try {
      const users = await repository.find({
        where: { email, isActive: true }
      });
      return ok((await UserDto.fromDataToDomain(users)) as User);
    } catch(error) {
      return err(new UserDatabaseException(error.message));
    }
  }

}