import { DataSource } from 'typeorm';

export type BootstrapReturn = boolean | Error | DataSource;
export type BootstrapKafkaReturn = Promise<boolean | Error | DataSource>;
export interface Bootstrap {
  initialize(): Promise<BootstrapReturn>;
  close(): void;
}
export interface BootstrapKafka {
  initialize(): BootstrapKafkaReturn;
}
