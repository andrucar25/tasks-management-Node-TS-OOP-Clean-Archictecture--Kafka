import dotenv from 'dotenv';

dotenv.config();
export class EnvConfig {
  private static instance: EnvConfig;
  public readonly environment: string;
  public readonly port: number;
  public readonly dbHost: string;
  public readonly dbPort: number;
  public readonly dbUsername: string;
  public readonly dbPassword: string;
  public readonly dbName: string;
  public readonly dbSynchronize: boolean;
  public readonly dbLogging: boolean;
  public readonly dbPoolSize: number;

  private constructor() {
    const {
      NODE_ENV: environment = 'development',
      PORT: port = '3003',
      DB_HOST: dbHost = 'localhost',
      DB_PORT: dbPort = '5432',
      DB_USERNAME: dbUsername = 'admin',
      DB_PASSWORD: dbPassword = '12345',
      DB_NAME: dbName = 'user_db',
      DB_SYNCHRONIZE: dbSynchronize = 'true',
      DB_LOGGING: dbLogging = 'true',
      DB_POOL_SIZE: dbPoolSize = '10'
    } = process.env;

    this.environment = environment;
    this.port = +port; // Convert to number
    this.dbHost = dbHost;
    this.dbPort = +dbPort;
    this.dbUsername = dbUsername;
    this.dbPassword = dbPassword;
    this.dbName = dbName;
    this.dbSynchronize = dbSynchronize === 'true';
    this.dbLogging = dbLogging !== 'false';;
    this.dbPoolSize = +dbPoolSize
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
      dbHost: this.dbHost,
      dbPort: this.dbPort,
      dbUsername: this.dbUsername,
      dbPassword: this.dbPassword,
      dbName: this.dbName,
      dbSynchronize: this.dbSynchronize,
      dbLogging: this.dbLogging,
      dbPoolSize: this.dbPoolSize
    };
  }
}