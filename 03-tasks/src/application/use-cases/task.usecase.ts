import { Result } from "neverthrow";

import { TaskRepository } from '../../domain/repositories/task.repository';
import { Task, UpdateState } from '../../domain/entities/task';
import { TaskDatabaseException } from '../../infrastructure/exceptions/task-database.exception';
import { ProducerService } from '../../infrastructure/messaging/producer.service';

export class TaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async save(task: Task): Promise<Result<Task, TaskDatabaseException>> {
    return this.taskRepository.save(task);
  }

  async updateState(values: UpdateState): Promise<Result<Task, TaskDatabaseException>> {
    const updateStateResult = this.taskRepository.updateState(values);
    
    if((await updateStateResult).isOk()){
      //publish event in kafka
      const {taskId} = values;
      await ProducerService.publish(values, taskId, "Task");
    }

    return updateStateResult;
  }

  async taskById(id: string): Promise<Result<Task, TaskDatabaseException>> {
    return this.taskRepository.taskById(id);
  }
}

