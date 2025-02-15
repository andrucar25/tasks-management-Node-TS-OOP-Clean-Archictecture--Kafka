import 'reflect-metadata';
import { NextFunction, Request, Response } from "express";

import { UserUseCase } from '../application/use-cases/user.usecase';
import { UserFactory } from '../domain/entities/user.factory';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async insert(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;

    const user = UserFactory.create({username, email, password});

    const userResult = await this.userUseCase.save(user);

    if (userResult.isErr()) {
      return next(userResult.error); 
    }

    res.status(201).json(userResult.value);
  }

  async getByEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const userResult = await this.userUseCase.getByEmail(email);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    res.status(201).json(userResult.value);
  }

}