// export class UserApplication {
//   constructor(private readonly repository: UserRepository) {}

//   async save(user: User) {
//     return await this.repository.save(user);
//   }

//   async getAll() {
//     return await this.repository.getAll();
//   }

//   async getById(id: string) {
//     return await this.repository.getById(id);
//   }

//   async getByPage(page: number, size: number) {
//     return await this.repository.getByPage(page, size);
//   }

//   async getByEmail(email: string) {
//     return await this.repository.getByEmail(email);
//   }
// }
import { Result } from "neverthrow";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserDatabaseException } from "../../infrastructure/exceptions/user-database.exception";
import { BCrypt } from "../../libraries/bcrypt";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<Result<User, UserDatabaseException>> {
    const hashedPassword = await BCrypt.hash(user.getPassword());
    user.setPassword(hashedPassword);
    
    return this.userRepository.save(user);
  }
}

// export class UpdateUserUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

//   async execute(user: User): Promise<Result<User, UserDatabaseException>> {
//     // Delega al repositorio
//     return this.userRepository.update(user);
//   }
// }

// export class GetUserByIdUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

//   async execute(id: string): Promise<Result<User, UserDatabaseException>> {
//     // Delega al repositorio
//     return this.userRepository.getById(id);
//   }
// }

// export class GetAllUsersUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

//   async execute(): Promise<Result<User[], UserDatabaseException>> {
//     // Delega al repositorio
//     return this.userRepository.getAll();
//   }
// }

// export class GetUsersByPageUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

//   async execute(page: number, size: number): Promise<Result<User[], UserDatabaseException>> {
//     // Delega al repositorio
//     return this.userRepository.getByPage(page, size);
//   }
// }

// export class GetUserByEmailUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

//   async execute(email: string): Promise<Result<User, UserDatabaseException>> {
//     // Delega al repositorio
//     return this.userRepository.getByEmail(email);
//   }
// }