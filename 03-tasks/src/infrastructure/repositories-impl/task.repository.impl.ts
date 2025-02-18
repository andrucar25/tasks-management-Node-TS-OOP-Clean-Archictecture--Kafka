import { err, ok } from "neverthrow";

import db from "../bootstrap/postgreSQL";
import { TaskDatabaseException } from "../exceptions/task-database.exception";
import { TaskRepository, TaskResult } from '../../domain/repositories/task.repository';
import { UpdateState } from "src/domain/entities/task";
import { Task } from '../../domain/entities/task';
import { TaskEntity } from "../db-persistance/task.entity";
import { TaskSaveDto } from "../dtos/task-save.dto";
import { TaskDto } from "../dtos/task.dto";

export class TaskRepositoryImpl implements TaskRepository {
  async save(task: Task): Promise<TaskResult> {
    const repository = db.getDataSource().getRepository(TaskEntity);
    
    try {
      await repository.save(TaskSaveDto.fromDomainToData(task));
      return ok(task);
    } catch (error) {
      return err(new TaskDatabaseException(error.message));
    }
  }

  async updateState(updateState: UpdateState): Promise<TaskResult> {
    const repository = db.getDataSource().getRepository(TaskEntity);
    
    try {
      await repository.update(updateState.taskId, {state: updateState.state});
      
      const updatedTask = await this.taskById(updateState.taskId);
      if (updatedTask.isErr()) {
        return err(updatedTask.error); 
      }

      return ok(updatedTask.value);
    } catch (error) {
      return err(new TaskDatabaseException(error.message));
    }
  }

  async taskById(id: string): Promise<TaskResult> {
    const repository = db.getDataSource().getRepository(TaskEntity);

    try {
      const task = await repository.find({where: {id}});

      return ok((await TaskDto.fromDataToDomain(task)) as Task);
    } catch (error) {
      return err(new TaskDatabaseException(error.message));
    }
    
  }

}