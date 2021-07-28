import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';
import { errorHandler } from './errorHandler';

const app = express();
app.use(morgan('combined'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', routes.users);
app.use('/customers', routes.customers);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return errorHandler(err, req, res);
});

export default app;
