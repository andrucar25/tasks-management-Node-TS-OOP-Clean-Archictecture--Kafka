import { Result } from "neverthrow";

import { Task, UpdateState } from "../entities/task";

export type TaskResult = Result<Task, Error>;

export interface TaskRepository {
  save(task: Task): Promise<TaskResult>;
  updateState(values: UpdateState): Promise<TaskResult>
  taskById(id: string): Promise<TaskResult>
}