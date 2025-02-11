import { DataSource } from 'typeorm';

export type BootstrapReturn = boolean | Error | DataSource;
export interface Bootstrap {
  initialize(): Promise<boolean | Error | DataSource>;
  close(): void;
}
