import Server from './infrastructure/bootstrap/server';
import { Bootstrap } from './infrastructure/bootstrap/bootstrap';
import app from './infrastructure/app';

const server: Bootstrap = new Server(app);

(async () => {
  try {
    console.log('info', 'Starting server ...');
    const promises: Array<Promise<boolean | Error >> = [
      server.initialize(),
    ];
    await Promise.all(promises);
  } catch (error) {
    console.error(error);
    server.close();
  }
})();