import axios from "axios";
import { err, ok } from "neverthrow";

import { Parameters } from "../../core/helpers/parameters";
import { AuthDatabaseException } from "../exceptions/auth-database.exception";
import { AuthRepository, UserResult } from '../../domain/repositories/auth.repository';

export class AuthRepositoryImpl implements AuthRepository {
  async getUserByEmail(email: string): Promise<UserResult> {
    try {
      const response = await axios.post(Parameters.SERVICE_USER_BY_EMAIL, {
        email,
      }); 
      return ok(response.data[0]);
    } catch (error) {
      return err(new AuthDatabaseException(error.message));
    }
  }
}