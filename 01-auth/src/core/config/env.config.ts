import dotenv from 'dotenv';

dotenv.config();
export class EnvConfig {
  private static instance: EnvConfig;
  public readonly environment: string;
  public readonly port: number;
  public readonly serviceUserByEmail: string;
  public readonly tokenSecret: string;

  private constructor() {
    const {
      NODE_ENV: environment = 'development',
      PORT: port = '3001',
      SERVICE_USER_BY_EMAIL: serviceUserByEmail = 'http://localhost:3002/user/user-by-email',
      TOKEN_SECRET: tokenSecret = 'c270f3c2-ad37-4148-a7cb-12a21f886cdb'
    } = process.env;

    this.environment = environment;
    this.port = +port; // Convert to number
    this.serviceUserByEmail = serviceUserByEmail;
    this.tokenSecret = tokenSecret;

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
      environment: this.environment,
      port: this.port,
      serviceUserByEmail: this.serviceUserByEmail,
      tokenSecret: this.tokenSecret,
 
    };
  }
}