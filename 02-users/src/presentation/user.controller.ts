import { NextFunction, Request, Response } from "express";

import { CreateUserUseCase } from '../application/use-cases/user.usecase';
import { User } from '../domain/entities/user';
import { UserFactory } from '../domain/entities/user.factory';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async insert(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;

    const user = UserFactory.create({username, email, password});

    const userResult = await this.createUserUseCase.execute(user);

    if (userResult.isErr()) {
      return next(userResult.error); 
    }

    res.status(201).json(userResult.value);
  }

  // async update(req: Request, res: Response, next: NextFunction) {
  //   const { id } = req.params;
  //   const userResult = await this.application.getById(id);
  //   if (userResult.isErr()) {
  //     return next(userResult.error);
  //   }

  //   const user = userResult.value;
  //   user.update(req.body);

  //   const userUpdateResult = await this.application.save(user);
  //   if (userUpdateResult.isErr()) {
  //     return next(userUpdateResult.error);
  //   }

  //   res.json(userUpdateResult.value);
  // }

  // async delete(req: Request, res: Response, next: NextFunction) {
  //   const { id } = req.params;
  //   const userResult = await this.application.getById(id);
  //   if (userResult.isErr()) {
  //     return next(userResult.error);
  //   }

  //   const user = userResult.value;
  //   user.delete();

  //   const userDeleteResult = await this.application.save(user);
  //   if (userDeleteResult.isErr()) {
  //     return next(userDeleteResult.error);
  //   }

  //   res.json(userDeleteResult.value);
  // }

  // async getAll(req: Request, res: Response, next: NextFunction) {
  //   const userResult = await this.application.getAll();
  //   if (userResult.isErr()) {
  //     return next(userResult.error);
  //   }

  //   res.json(userResult.value);
  // }

  // async getById(req: Request, res: Response, next: NextFunction) {
  //   const { id } = req.params;
  //   const userResult = await this.application.getById(id);
  //   if (userResult.isErr()) {
  //     return next(userResult.error);
  //   }

  //   res.json(userResult.value);
  // }

  // async getByPage(req: Request, res: Response, next: NextFunction) {
  //   const { page, size } = req.params;
  //   const userResult = await this.application.getByPage(
  //     Number(page),
  //     Number(size)
  //   );
  //   if (userResult.isErr()) {
  //     return next(userResult.error);
  //   }

  //   res.json(userResult.value);
  // }

  // async getByEmail(req: Request, res: Response, next: NextFunction) {
  //   const { email } = req.body;
  //   const userResult = await this.application.getByEmail(email);
  //   if (userResult.isErr()) {
  //     return next(userResult.error);
  //   }

  //   res.json(userResult.value);
  // }
}