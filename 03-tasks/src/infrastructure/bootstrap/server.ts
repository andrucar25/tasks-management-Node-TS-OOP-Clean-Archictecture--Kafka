import http from 'http';
import { Application } from 'express';

import { Bootstrap } from './bootstrap';
import { Parameters } from '../../core/helpers/parameters';

export default class implements Bootstrap {
  constructor(private readonly app: Application) {}

  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(Parameters.PORT)
        .on('listening', () => {
          console.info(`Server is running on port ${Parameters.PORT}`);
          resolve(true);
        })
        .on('error', (error: Error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  close() {
    process.exit(1);
  }
}
