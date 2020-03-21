import './utils/dotEnv';

import apollo from './server/apollo';
import app from './server/app';
import logger from './utils/logger';

const defaultOrigin: string[] =
  process.env.NODE_ENV !== 'production' ? ['https://localhost'] : [];
const origin: string[] = process.env.CORS_URLS
  ? process.env.CORS_URLS.split(',')
  : ['https://helpmeout.io'];

const cors = {
  allowedHeaders: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: defaultOrigin.concat(origin),
  preflightContinue: false
};

apollo.applyMiddleware({ app, path: '/', cors });

const port = process.env.PORT || 3000;

try {
  app.listen({ port }, () => {
    logger.info(`🚀 Server ready!`);
  });
} catch (error) {
  logger.error(error);
}
