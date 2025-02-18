import { Result } from "neverthrow";

import { TaskRepository } from '../../domain/repositories/task.repository';
import { Task, UpdateState } from '../../domain/entities/task';
import { TaskDatabaseException } from '../../infrastructure/exceptions/task-database.exception';

export class TaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async save(task: Task): Promise<Result<Task, TaskDatabaseException>> {
    return this.taskRepository.save(task);
  }

  async updateState(values: UpdateState): Promise<Result<Task, TaskDatabaseException>> {
    return this.taskRepository.updateState(values);
  }

  async taskById(id: string): Promise<Result<Task, TaskDatabaseException>> {
    return this.taskRepository.taskById(id);
  }
}

