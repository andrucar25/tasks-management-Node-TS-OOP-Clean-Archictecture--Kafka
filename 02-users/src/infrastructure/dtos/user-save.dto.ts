import { User } from "../../domain/entities/user";
import { UserEntity } from "../db-persistence/user.entity";

export class UserSaveDto {
  static fromDomainToData(user: User): UserEntity {
    const properties: any = user.properties();

    const entity = new UserEntity();
    entity.id = properties.id;
    entity.username = properties.username;
    entity.email = properties.email;
    entity.password = properties.password;
    entity.createdAt = properties.createdAt;
    entity.updatedAt = properties.updatedAt;
    entity.isActive = properties.isActive;

    return entity;
  }
}