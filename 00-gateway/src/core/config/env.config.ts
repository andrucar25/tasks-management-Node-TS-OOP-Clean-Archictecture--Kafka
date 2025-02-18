import dotenv from 'dotenv';

dotenv.config();
export class EnvConfig {
  private static instance: EnvConfig;
  public readonly port: number;
  public readonly environment: string;
  public readonly serviceAuthLogin: string;
  public readonly serviceAuthValidateToken: string;
  public readonly serviceUserSave: string;
  public readonly serviceTaskSave: string;
  public readonly serviceTaskStateUpdate: string;

  private constructor() {
    const {
      PORT: port = '3000',
      ENVIRONMENT: environment = 'development',
      SERVICE_AUTH_LOGIN: serviceAuthLogin = 'http://localhost:3001/user/login',
      SERVICE_AUTH_VALIDATE_TOKEN: serviceAuthValidateToken = 'http://localhost:3001/user/validate-token',
      SERVICE_USER_SAVE: serviceUserSave = 'http://localhost:3002/user',
      SERVICE_TASK_SAVE: serviceTaskSave = 'http://localhost:3003/task',
      SERVICE_TASK_STATE_UPDATE: serviceTaskStateUpdate = 'http://localhost:3003/update-state'
    } = process.env;

    this.port = +port;
    this.environment = environment;
    this.serviceAuthLogin = serviceAuthLogin;
    this.serviceAuthValidateToken = serviceAuthValidateToken;
    this.serviceUserSave = serviceUserSave;
    this.serviceTaskSave = serviceTaskSave;
    this.serviceTaskStateUpdate = serviceTaskStateUpdate;

  }

  //Singleton pattern to create only 1 instance of the class and just call process.env once
  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig(); 
    }
    return EnvConfig.instance;
  }

  public getConfig() {
    return {
      port: this.port,
      environment: this.environment,
      serviceAuthLogin: this.serviceAuthLogin,
      serviceAuthValidateToken: this.serviceAuthValidateToken,
      serviceUserSave: this.serviceUserSave,
      serviceTaskSave: this.serviceTaskSave,
      serviceTaskStateUpdate: this.serviceTaskStateUpdate
 
    };
  }
}