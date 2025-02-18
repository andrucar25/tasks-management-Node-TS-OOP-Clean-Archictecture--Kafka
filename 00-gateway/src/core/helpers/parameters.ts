import { EnvConfig } from "../config/env.config";

const envConfig = EnvConfig.getInstance();

export class Parameters {
  static get PORT() {
    return envConfig.port;
  }

  static get ENVIRONMENT() {
    return envConfig.environment;
  }

  static get SERVICE_AUTH_LOGIN() {
    return envConfig.serviceAuthLogin;
  }

  static get SERVICE_AUTH_VALIDATE_TOKEN() {
    return envConfig.serviceAuthValidateToken;
  }

  static get SERVICE_USER_SAVE() {
    return envConfig.serviceUserSave;
  }

  static get SERVICE_TASK_SAVE() {
    return envConfig.serviceTaskSave;
  }

  static get SERVICE_TASK_STATE_UPDATE() {
    return envConfig.serviceTaskStateUpdate;
  }

}
