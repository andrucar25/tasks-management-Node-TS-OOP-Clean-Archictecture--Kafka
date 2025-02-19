import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { IError } from "../../core/helpers/error.interface";

export class Validator {
  static execute(validators: Record<string, any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      for (const key in validators) {
        const validatorDto = validators[key];
        switch (key) {
          case "body":
            Object.assign(validatorDto, req.body);
            break;
          case "params":
            Object.assign(validatorDto, req.params);
            break;
          case "query":
            Object.assign(validatorDto, req.query);
            break;
          case "headers":
            Object.assign(validatorDto, req.headers);
            break;
          default:
            break;
        }

        const errors = await validate(validatorDto);

        if (errors.length > 0) {
          console.log("errors", JSON.stringify(errors, null, "\t"));
          const listErrors: string[] = [];
          for (const error of errors) {
            for (const constraint in error.constraints) {
              listErrors.push(error.constraints[constraint]);
            }
          }

          const err: IError = new Error();
          err.name = "ValidationError";
          err.message = listErrors.join(", ");
          err.status = 411;

          return next(err);
        }
      }
      return next();
    };
  }
}