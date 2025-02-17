import { NextFunction, Request, Response } from "express";

import { GatewayUseCase } from '../../application/use-cases/gateway.usecase';
import { Parameters } from '../../core/helpers/parameters';
import { IError } from '../../core/helpers/error.interface';
import { User } from '../../infrastructure/types/express.types';

export class Authentication {
  static canActivate(gatewayUseCas: GatewayUseCase) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.headers["authorization"];
      if (!authorization) {
        const error: IError = new Error("User unauthenticated");
        error.status = 401;
        return next(error);
      }

      const accessToken = authorization.split(" ")[1];
      
      if (!accessToken) {
        const error: IError = new Error("User unauthenticated");
        error.status = 401;
        return next(error);
      } else {
        const result = await gatewayUseCas.endpointRequest(
          Parameters.SERVICE_AUTH_VALIDATE_TOKEN,
          "POST",
          { accessToken }
        );

        if (result.isErr()) {
          return next(result.error);
        }

        const user = result.value;
        req.user = user as User;

        return next();
      }
    };
  }
}