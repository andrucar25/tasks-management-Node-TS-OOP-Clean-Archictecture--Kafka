import { Result } from "neverthrow";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserDatabaseException } from "../../infrastructure/exceptions/user-database.exception";
import { BCrypt } from "../../libraries/bcrypt";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async save(user: User): Promise<Result<User, UserDatabaseException>> {
    const hashedPassword = await BCrypt.hash(user.getPassword());
    user.setPassword(hashedPassword);
    
    return this.userRepository.save(user);
  }

  async getByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }
}

