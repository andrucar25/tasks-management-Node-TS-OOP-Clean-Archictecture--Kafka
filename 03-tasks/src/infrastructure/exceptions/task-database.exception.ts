export class TaskDatabaseException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "TaskDatabaseException";
    this.message = message;
    Object.setPrototypeOf(this, TaskDatabaseException.prototype);
  }
}