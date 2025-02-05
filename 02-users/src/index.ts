import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

import Server from './infrastructure/bootstrap/server';
import { Bootstrap } from './infrastructure/bootstrap/bootstrap';
import logger from './core/helpers/logger';
import app from './infrastructure/app';

dotenv.config();

const server: Bootstrap = new Server(app);

dotenv.config();

//esto es una funcion autoinvocada
(async () => {
  try {
    logger.log('info', 'Starting server ...');
    const promises: Array<Promise<boolean | Error | DataSource>> = [
      server.initialize()
    ];
    await Promise.all(promises);
    // logger.info('PostgreSQL connected');
  } catch (error) {
    logger.error(error);
    server.close();
  }
})();