import { EnvConfig } from "../config/env.config";

const envConfig = EnvConfig.getInstance();

export class Parameters {
  static get PORT() {
    return envConfig.port;
  }

  static get ENVIRONMENT() {
    return envConfig.environment;
  }

  static get SERVICE_USER_BY_EMAIL() {
    return envConfig.serviceUserByEmail;
  }

  static get JWT_SECRET() {
    return envConfig.tokenSecret;
  }

}
