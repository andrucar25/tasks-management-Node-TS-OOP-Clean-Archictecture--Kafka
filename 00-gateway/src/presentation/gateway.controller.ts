import { NextFunction, Request, Response } from "express";

import { GatewayUseCase } from '../application/use-cases/gateway.usecase';
import { Parameters } from '../core/helpers/parameters';

export class GatewayController {
  constructor(private readonly gatewayUseCase: GatewayUseCase) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = await this.gatewayUseCase.endpointRequest(
      Parameters.SERVICE_AUTH_LOGIN,
      "POST",
      data
    );

    if (result.isErr()) {
      return next(result.error);
    }

    res.json(result.value);
  }

  async saveUser(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = await this.gatewayUseCase.endpointRequest(
      Parameters.SERVICE_USER_SAVE,
      "POST",
      data
    );

    if (result.isErr()) {
      return next(result.error);
    }
    
    res.json(result.value);
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = await this.gatewayUseCase.endpointRequest(
      Parameters.SERVICE_AUTH_VALIDATE_TOKEN,
      "POST",
      data
    );

    if (result.isErr()) {
      return next(result.error);
    }

    res.json(result.value);
  }

  async saveTask(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const {id} = req.user;
    const taskData = {...data, creator: id};

    const result = await this.gatewayUseCase.endpointRequest(
      Parameters.SERVICE_TASK_SAVE,
      "POST",
      taskData
    );

    if (result.isErr()) {
      return next(result.error);
    }

    res.json(result.value);
  }

}