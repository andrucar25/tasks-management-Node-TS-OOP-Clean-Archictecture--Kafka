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

export interface IKafkaConfig {
  kafkaBroker: string;
  kafkaTopicTask: string;
  kafkaGroupId: string;
  clientId: string;
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

  static get KAFKA_CONFIG(): IKafkaConfig {
    return {
      kafkaBroker: envConfig.kafkaBroker,
      kafkaTopicTask: envConfig.kafkaTopicTask,
      kafkaGroupId: envConfig.kafkaGroupId,
      clientId: envConfig.clientId
    }
  }
}
