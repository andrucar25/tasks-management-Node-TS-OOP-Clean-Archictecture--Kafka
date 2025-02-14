import { Router } from "express";

// import { Authentication } from "./middlewares/authentication";
import { GatewayUseCase } from '../application/use-cases/gateway.usecase';
import { GatewayRepositoryImpl } from '../infrastructure/repositories-impl/gateway.repository.impl';
import { GatewayRepository } from '../domain/repositories/gateway.repository';
import { GatewayController } from './gateway.controller';

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
    // this.router.get(
    //   "/usuarios",
    //   Authentication.canActivate(application),
    //   controller.getUsers.bind(controller)
    // );
    return this.router;
  }

  addRoutes() {}
}

export default new GatewayRoute().getRouter();