import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { Parameters } from '../../core/helpers/parameters';

export class AuthService {

  static async validatePassword(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  static generateAccessToken(username: string,email: string): string {
    return jwt.sign({ username, email }, Parameters.JWT_SECRET, {
      expiresIn: "7d",
      // expiresIn: 30, to expire in 30 seconds
    });
  }


  static validateAccessToken(accessToken: string) {
    try {
      return jwt.verify(accessToken, Parameters.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}