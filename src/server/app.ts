import * as Sentry from '@sentry/node';
import express, { NextFunction, Request } from 'express';
import helmet from 'helmet';
import '../utils/dotEnv';

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_KEY
})

if (process.env.NODE_ENV === 'production') {
  app.use(Sentry.Handlers.requestHandler());

  app.use(helmet.hsts({
    maxAge: 31536000,
    preload: true,
  }));

  app.use(Sentry.Handlers.errorHandler());
  app.use((err: any, req: Request, res: any, next: NextFunction) => {
    res.statusCode = 500;
    res.end(res.sentry + '\n');
  });
}

app.enable('trust proxy');
app.disable('x-powered-by');

export default app;
