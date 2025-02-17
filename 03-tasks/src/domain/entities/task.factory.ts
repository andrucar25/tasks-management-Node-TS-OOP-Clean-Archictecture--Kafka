import { Task, TaskProps } from "./task";

export class TaskFactory {
  private constructor() {}

  static create(props: TaskProps): Task {
    return new Task(props);
  }
}