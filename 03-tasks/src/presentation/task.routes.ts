import { Router } from "express";

import { Validator } from "./middlewares/validator";
import { TaskController } from "./task.controller";
import { TaskUseCase } from '../application/use-cases/task.usecase';
import { TaskRepository } from '../domain/repositories/task.repository';
import { TaskRepositoryImpl } from '../infrastructure/repositories-impl/task.repository.impl';
import { TaskInsertDto } from '../infrastructure/dtos/task-insert.dto';

const repository: TaskRepository = new TaskRepositoryImpl();
const userUseCase = new TaskUseCase(repository);
const controller = new TaskController(userUseCase);

class TaskRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  getRouter() {
    this.router.post(
      "/",
      Validator.execute({ body: new TaskInsertDto() }),
      controller.insert.bind(controller)
    );

    return this.router;
  }

  addRoutes() {}
}

export default new TaskRoute().getRouter();