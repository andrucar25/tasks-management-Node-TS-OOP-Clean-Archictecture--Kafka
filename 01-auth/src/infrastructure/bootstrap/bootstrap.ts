
export type BootstrapReturn = boolean | Error;
export interface Bootstrap {
  initialize(): Promise<boolean | Error>;
  close(): void;
}
