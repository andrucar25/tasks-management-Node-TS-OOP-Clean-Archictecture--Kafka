import { Router } from "express";

import { AuthRepository } from '../domain/repositories/auth.repository';
import { AuthRepositoryImpl } from '../infrastructure/repositories-impl/auth.repository.impl';
import { AuthUseCase } from '../application/usecases/auth.usecase';
import { AuthController } from "./auth.controller";

const repository: AuthRepository = new AuthRepositoryImpl();
const application = new AuthUseCase(repository);
const controller = new AuthController(application);

class AuthRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  getRouter() {
    this.router.post("/login", controller.login.bind(controller));
    this.router.post("/validate-token", controller.validateToken.bind(controller));

    return this.router;
  }

  addRoutes() {}
}

export default new AuthRoute().getRouter();