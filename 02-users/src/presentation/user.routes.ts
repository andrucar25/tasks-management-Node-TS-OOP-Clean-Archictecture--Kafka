import { Router } from "express";

import { UserRepository } from "../domain/repositories/user.repository";
import { UserInsertDto } from "./dtos/user-insert.dto";
import { Validator } from "./middlewares/validator";
import { UserRepositoryImpl } from "../infrastructure/repositories-impl/user.repository.impl";
import { UserUseCase } from '../application/use-cases/user.usecase';
import { UserController } from "./user.controller";
import { UserByEmailDto } from "./dtos/user-by-email.dto";

const repository: UserRepository = new UserRepositoryImpl();
const userUseCase = new UserUseCase(repository);
const controller = new UserController(userUseCase);

class UserRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  getRouter() {
    this.router.post(
      "/",
      Validator.execute({ body: new UserInsertDto() }),
      controller.insert.bind(controller)
    );
    this.router.post(
      "/user-by-email",
      Validator.execute({ body: new UserByEmailDto() }),
      controller.getByEmail.bind(controller)
    );

    return this.router;
  }

  addRoutes() {}
}

export default new UserRoute().getRouter();