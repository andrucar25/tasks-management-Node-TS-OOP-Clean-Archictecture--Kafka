import dotenv from 'dotenv';

dotenv.config();
export class EnvConfig {
  private static instance: EnvConfig;
  public readonly port: number;
  public readonly environment: string;
  public readonly serviceAuthLogin: string;
  public readonly serviceAuthValidateToken: string;
  public readonly serviceUserSave: string;

  private constructor() {
    const {
      PORT: port = '3000',
      ENVIRONMENT: environment = 'development',
      SERVICE_AUTH_LOGIN: serviceAuthLogin = 'http://localhost:3001/user/login',
      SERVICE_AUTH_VALIDATE_TOKEN: serviceAuthValidateToken = 'http://localhost:3001/user/validate-token',
      SERVICE_USER_SAVE: serviceUserSave = 'http://localhost:3002/user'
    } = process.env;

    this.port = +port;
    this.environment = environment;
    this.serviceAuthLogin = serviceAuthLogin;
    this.serviceAuthValidateToken = serviceAuthValidateToken;
    this.serviceUserSave = serviceUserSave;
    this.serviceUserSave = serviceUserSave;

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
      serviceUserSave: this.serviceUserSave
 
    };
  }
}