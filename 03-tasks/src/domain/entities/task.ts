export type Priority = 'low' | 'medium' | 'high';
export type State = 'created' | 'inProgress' | 'finished';
export type UpdateState = {
  taskId: string;
  state: State;
}

export interface TaskEssentials {
  readonly title: string,
  readonly description: string,
  readonly creator: string,
  readonly assignedTo: string,
}

export interface TaskOptionals {
  readonly id: string,
  readonly state: State,
  readonly priority: Priority,
  readonly createdAt: Date,
  readonly limitDate: number,
  readonly updatedAt: Date,
}

export type TaskProps = TaskEssentials & Partial<TaskOptionals>;

export class Task {
  private readonly id: string;
  private title: string;
  private description: string;
  private state: State;
  private priority: Priority | null;
  private readonly createdAt: Date;
  private limitDate: number;
  public updatedAt: Date | null;
  private creator: string
  private assignedTo: string
  
  constructor(props: TaskProps) {
    Object.assign(this, props);
  }

  properties(): TaskProps {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      state: this.state,
      priority: this.priority,
      createdAt: this.createdAt,
      limitDate: this.limitDate,
      updatedAt: this.updatedAt,
      creator: this.creator,
      assignedTo: this.assignedTo
    };
  }

}

