import Server from './infrastructure/bootstrap/server';
import { Bootstrap } from './infrastructure/bootstrap/bootstrap';
import logger from './core/helpers/logger';
import app from './infrastructure/app';

const server: Bootstrap = new Server(app);

(async () => {
  try {
    logger.log('info', 'Starting server ...');
    const promises: Array<Promise<boolean | Error >> = [
      server.initialize(),
    ];
    await Promise.all(promises);
  } catch (error) {
    logger.error(error);
    server.close();
  }
})();