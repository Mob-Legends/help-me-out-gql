import express from 'express';
import helmet from 'helmet';
import '../utils/dotEnv';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      preload: true
    })
  );
}

app.enable('trust proxy');
app.disable('x-powered-by');

export default app;
