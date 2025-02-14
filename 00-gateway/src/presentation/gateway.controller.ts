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

}