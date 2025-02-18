import { TaskEntity } from "../db-persistance/task.entity";
import { Task } from '../../domain/entities/task';
import { TaskFactory } from '../../domain/entities/task.factory';

export class TaskDto {
  static async fromDataToDomain(data: TaskEntity | TaskEntity[]): Promise<Task | Task[]> {
    if (Array.isArray(data)) {
      const users = await Promise.all(data.map(async (userEntity) => {
        return await TaskDto.fromDataToDomain(userEntity);
      }));
      return users as Task[];
    }

    // if (Array.isArray(data)) {
    //   for (const user of data) {
    //     return await UserDto.fromDataToDomain(user);
    //   }
    // }

    const taskInfo = data as TaskEntity;
 
    const task = TaskFactory.create({
      id: taskInfo.id,
      title: taskInfo.title,
      description: taskInfo.description,
      state: taskInfo.state,
      priority: taskInfo.priority,
      createdAt: taskInfo.createdAt,
      limitDate: taskInfo.limitDate,
      updatedAt: taskInfo.updatedAt,
      creator: taskInfo.creator,
      assignedTo: taskInfo.assignedTo
    });

    return task;
  }
}