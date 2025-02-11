import { DataSource } from "typeorm";

import { Bootstrap, BootstrapReturn } from "./bootstrap";
import { Parameters } from "../../core/helpers/parameters";

export default class PostgreSQLBootstrap implements Bootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<BootstrapReturn> {
    const mysqlConfig = Parameters.POSTGRESQL_CONFIG;

    PostgreSQLBootstrap.appDataSource = new DataSource({
      type: "postgres",
      ...mysqlConfig,
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