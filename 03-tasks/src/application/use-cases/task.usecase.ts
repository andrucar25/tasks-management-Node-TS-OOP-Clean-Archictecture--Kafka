import { Result } from "neverthrow";
// import { User } from "../../domain/entities/user";
// import { UserRepository } from "../../domain/repositories/user.repository";
// import { UserDatabaseException } from "../../infrastructure/exceptions/user-database.exception";
import { TaskRepository } from '../../domain/repositories/task.repository';
import { Task } from '../../domain/entities/task';
import { TaskDatabaseException } from '../../infrastructure/exceptions/task-database.exception';

export class TaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async save(task: Task): Promise<Result<Task, TaskDatabaseException>> {
    
    return this.taskRepository.save(task);
  }

  // async getByEmail(email: string) {
  //   return this.userRepository.getByEmail(email);
  // }
}

