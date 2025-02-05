import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { HandlerErrors } from '../core/helpers/errors';
// import MedicRouter from './modules/medic/presentation/medic.routes';
// import { AuthenticationMiddleware } from './core/presentation/middlewares/authentication';

class App {
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.mountHealthCheck();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountHandlerErrors();
  }

  mountHealthCheck(): void {
    this.app.get('/health', (req, res) => {
      res.send('ok');
    });
  }

  mountMiddlewares(): void {
    this.app.use(cors()); 
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  mountRoutes(): void {
    // this.app.use('/medic', MedicRouter);
  }

  mountHandlerErrors(): void {
    this.app.use(HandlerErrors.notFound);
    this.app.use(HandlerErrors.generic);
  }

  getApp(): Application {
    return this.app;
  }
}

export default new App().getApp();
