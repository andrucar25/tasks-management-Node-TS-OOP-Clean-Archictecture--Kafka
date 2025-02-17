import { EnvConfig } from "../config/env.config";

const envConfig = EnvConfig.getInstance();

export interface IPostgreSQLConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  poolSize: number;
}

export class Parameters {
  static get PORT() {
    return envConfig.port;
  }

  static get ENVIRONMENT() {
    return envConfig.environment;
  }


  static get POSTGRESQL_CONFIG(): IPostgreSQLConfig {
    return {
      host: envConfig.dbHost,
      port: envConfig.dbPort,
      username: envConfig.dbUsername,
      password: envConfig.dbPassword,
      database: envConfig.dbName,
      synchronize: envConfig.dbSynchronize,
      logging: envConfig.dbLogging,
      poolSize: envConfig.dbPoolSize,
    };
  }

  // static get TOKEN_EXPIRES_TIME() {
  //   return Number(process.env.TIME_EXPIRES_TIME) || 1;
  // }

  // static get TOKEN_SECRET_KEY() {
  //   return (
  //     process.env.TOKEN_SECRET_KEY ||
  //     'Y1WH>2!OaBqiTXF1+mWfezXp.9hINR_gwDS!:<4Nf~!h'
  //   );
  // }
}
