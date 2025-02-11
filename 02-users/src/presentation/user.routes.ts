import { Router } from "express";

import { UserRepository } from "../domain/repositories/user.repository";
import { UserInsertDto } from "./dtos/user-insert.dto";
import { Validator } from "./middlewares/validator";
import { UserRepositoryImpl } from "../infrastructure/repositories-impl/user.repository.impl";
import { CreateUserUseCase } from '../application/use-cases/user.usecase';
import { UserController } from "./user.controller";

const repository: UserRepository = new UserRepositoryImpl();
const createUserUseCase = new CreateUserUseCase(repository);
const controller = new UserController(createUserUseCase);

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
    // this.router.get("/", controller.getAll.bind(controller));
    // this.router.get(
    //   "/:id",
    //   Validator.execute({ params: new UserByIdDto() }),
    //   controller.getById.bind(controller)
    // );
    // this.router.get(
    //   "/:page/:size",
    //   Validator.execute({ params: new UserByPageDto() }),
    //   controller.getByPage.bind(controller)
    // );
    // this.router.put(
    //   "/:id",
    //   Validator.execute({
    //     params: new UserByIdDto(),
    //     body: new UserUpdateDto(),
    //   }),
    //   controller.update.bind(controller)
    // );
    // this.router.delete(
    //   "/:id",
    //   Validator.execute({ params: new UserByIdDto() }),
    //   controller.delete.bind(controller)
    // );
    // this.router.post(
    //   "/user-by-email",
    //   Validator.execute({ body: new UserByEmailDto() }),
    //   controller.getByEmail.bind(controller)
    // );

    return this.router;
  }

  addRoutes() {}
}

export default new UserRoute().getRouter();