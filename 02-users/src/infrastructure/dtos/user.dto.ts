import { User } from "../../domain/entities/user";
import { UserFactory } from "../../domain/entities/user.factory";
import { UserEntity } from "../db-persistence/user.entity";

export class UserDto {
  static async fromDataToDomain(data: UserEntity | UserEntity[]): Promise<User | User[]> {
    if (Array.isArray(data)) {
      const users = await Promise.all(data.map(async (userEntity) => {
        return await UserDto.fromDataToDomain(userEntity);
      }));
      return users as User[];
    }

    // if (Array.isArray(data)) {
    //   for (const user of data) {
    //     return await UserDto.fromDataToDomain(user);
    //   }
    // }

    const userInfo = data as UserEntity;
 
    const user = UserFactory.create({
      id: userInfo.id,
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
      isActive: userInfo.isActive,
    });

    return user;
  }
}