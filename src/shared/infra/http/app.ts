import 'reflect-metadata';
import 'express-async-errors';

import './database';
import '@shared/container/index';

import AppError from '@shared/errors/AppError';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import routes from './routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.handleError();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(routes);
  }

  private handleError(): void {
    this.express.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        // eslint-disable-next-line no-console
        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'internal server error',
        });
      }
    );
  }
}
export default new App().express;
