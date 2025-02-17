import * as jwt from "jsonwebtoken";
import { err, ok, Result } from "neverthrow";

import { AuthRepository, AuthTokens } from '../../domain/repositories/auth.repository';
import { Auth } from '../../domain/entities/auth';
import { IError } from '../../core/helpers/error.interface';
import { AuthService } from './auth.service';

export type AuthLoginResult = Result<AuthTokens, Error>;
export type ValidateTokenResult = Result<string | jwt.JwtPayload, Error>;

export class AuthUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async login(auth: Auth): Promise<AuthLoginResult> {
    const userResult = await this.repository.getUserByEmail(
      auth.properties().email
    );

    if (userResult.isErr()) {
      const error: IError = new Error(userResult.error.message);
      error.status = 404;
      return err(error);
    }

    const user = userResult.value?.[0];

    if (!user) {
      const error: IError = new Error("User not found");
      error.status = 404;
      return err(error);
    }
    
    const isValidPassword = await AuthService.validatePassword(auth.properties().password, user.password)

    if (!isValidPassword) {
      const error: IError = new Error("Invalid credentials");
      error.status = 401;
      return err(error);
    }

    const { username, email, id } = user;
    const tokens = {
      accessToken: AuthService.generateAccessToken(username, email, id)
    };

    return ok(tokens);
  }

  async validateToken(accessToken: string): Promise<ValidateTokenResult> {
    const validateTokenResult = AuthService.validateAccessToken(accessToken);

    if (!validateTokenResult) {
      const error: IError = new Error("Invalid token");
      error.status = 401;
      return err(error);
    }

    return ok(validateTokenResult);
  }
}
