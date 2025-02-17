import { DataSource } from 'typeorm';

import Server from './infrastructure/bootstrap/server';
import { Bootstrap } from './infrastructure/bootstrap/bootstrap';
import app from './infrastructure/app';
import PostgreSQLBootstrap from './infrastructure/bootstrap/postgreSQL';


const server: Bootstrap = new Server(app);
const postresql: Bootstrap = new PostgreSQLBootstrap();

(async () => {
  try {
    console.log('info', 'Starting server ...');
    const promises: Array<Promise<boolean | Error | DataSource>> = [
      server.initialize(),
      postresql.initialize()
    ];
    await Promise.all(promises);
    console.info('PostgreSQL connected');
  } catch (error) {
    console.error(error);
    postresql.close();
    server.close();
  }
})();