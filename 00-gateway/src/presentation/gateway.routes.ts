import { Router } from "express";

import { GatewayUseCase } from '../application/use-cases/gateway.usecase';
import { GatewayRepositoryImpl } from '../infrastructure/repositories-impl/gateway.repository.impl';
import { GatewayRepository } from '../domain/repositories/gateway.repository';
import { GatewayController } from './gateway.controller';
import { Authentication } from "./middlewares/authentication";

const repository: GatewayRepository = new GatewayRepositoryImpl();
const application = new GatewayUseCase(repository);
const controller = new GatewayController(application);

class GatewayRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  getRouter() {
    this.router.post("/auth/login", controller.login.bind(controller));
    this.router.post("/user", controller.saveUser.bind(controller));
    this.router.post(
      "/auth/validate-token",
      controller.validateToken.bind(controller)
    );
    this.router.post(
      "/task",
      Authentication.canActivate(application),
      controller.saveTask.bind(controller)
    );
    return this.router;
  }

  addRoutes() {}
}

export default new GatewayRoute().getRouter();