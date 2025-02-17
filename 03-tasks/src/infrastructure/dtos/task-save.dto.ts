import { Task } from '../../domain/entities/task';
import { TaskEntity } from '../db-persistance/task.entity';

export class TaskSaveDto {
  static fromDomainToData(task: Task): TaskEntity {
    const properties: any = task.properties();

    const entity = new TaskEntity();
    entity.id = properties.id;
    entity.title = properties.title;
    entity.description = properties.description;
    entity.state = properties.state;
    entity.priority = properties.priority;
    entity.createdAt = properties.createdAt;
    entity.limitDate = properties.limitDate;
    entity.updatedAt = properties.updatedAt;
    entity.creator = properties.creator;
    entity.assignedTo = properties.assignedTo;

    return entity;
  }
}