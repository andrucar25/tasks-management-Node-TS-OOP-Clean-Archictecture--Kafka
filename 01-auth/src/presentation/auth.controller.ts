import { NextFunction, Request, Response } from "express";

import { AuthUseCase } from '../application/usecases/auth.usecase';
import { AuthFactory } from '../domain/entities/auth.factory';

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const auth = AuthFactory.create({ email, password });

    const authLoginResult = await this.authUseCase.login(auth);
    if (authLoginResult.isErr()) {
      return next(authLoginResult.error);
    }

    res.json(authLoginResult.value);
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const { accessToken } = req.body;

    const authValidateTokenResult = await this.authUseCase.validateToken(accessToken);

    if (authValidateTokenResult.isErr()) {
      return next(authValidateTokenResult.error);
    }

    res.json(authValidateTokenResult.value);
  }
}