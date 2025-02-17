import { DataSource } from "typeorm";

import { Bootstrap, BootstrapReturn } from "./bootstrap";
import { Parameters } from "../../core/helpers/parameters";
import { TaskEntity } from "../db-persistance/task.entity";
export default class PostgreSQLBootstrap implements Bootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<BootstrapReturn> {
    const postgresqlConfig = Parameters.POSTGRESQL_CONFIG;

    PostgreSQLBootstrap.appDataSource = new DataSource({
      type: "postgres",
      ...postgresqlConfig,
      entities: [TaskEntity]
    });
    return PostgreSQLBootstrap.appDataSource.initialize();
  }
  close(): void {
    PostgreSQLBootstrap.appDataSource?.destroy();
  }

  static getDataSource(): DataSource {
    return PostgreSQLBootstrap.appDataSource;
  }
}