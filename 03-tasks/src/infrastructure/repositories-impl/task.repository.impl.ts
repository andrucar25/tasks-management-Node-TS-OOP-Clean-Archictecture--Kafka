import { err, ok } from "neverthrow";

import db from "../bootstrap/postgreSQL";
import { TaskDatabaseException } from "../exceptions/task-database.exception";
import { TaskRepository, TaskResult } from '../../domain/repositories/task.repository';
import { UpdateState } from "src/domain/entities/task";
import { Task } from '../../domain/entities/task';
import { TaskEntity } from "../db-persistance/task.entity";
import { TaskSaveDto } from "../dtos/task-save.dto";

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

  updateState(updateState: UpdateState): Promise<TaskResult> {
    throw new Error("Method not implemented.");
  }

}