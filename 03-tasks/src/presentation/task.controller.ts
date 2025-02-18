import 'reflect-metadata';
import { NextFunction, Request, Response } from "express";

import { TaskFactory } from '../domain/entities/task.factory';
import { TaskUseCase } from '../application/use-cases/task.usecase';

export class TaskController {
  constructor(private readonly taskUseCase: TaskUseCase) {}

  async insert(req: Request, res: Response, next: NextFunction) {
    const { title, description, priority, assignedTo, limitDate, creator} = req.body;
    const task = TaskFactory.create({title, description, priority, assignedTo, limitDate, creator});

    const taskResult = await this.taskUseCase.save(task);

    if (taskResult.isErr()) {
      return next(taskResult.error); 
    }

    res.status(201).json(taskResult.value);
  }

  async updateState(req: Request, res: Response, next: NextFunction) {
    const { taskId, state} = req.body;
    const taskResult = await this.taskUseCase.taskById(taskId);
    
    if (taskResult.isErr()) {
      return next(taskResult.error);
    }
    
    const taskUpdateResult = await this.taskUseCase.updateState({taskId, state});

    if (taskUpdateResult.isErr()) {
      return next(taskUpdateResult.error); 
    }
    res.status(201).json(taskUpdateResult.value);

  }

}