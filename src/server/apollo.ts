import { ApolloServer } from 'apollo-server-express';

import schema from '../schema/index';
import logger from '../utils/logger';
import { ApolloServerSentryPlugin } from './plugins/ApolloServerSentryPlugin';

const apollo = new ApolloServer({
  context: ({ req }) => ({
    req,
    logger
  }),
  schema,
  subscriptions: false,
  plugins: process.env.NODE_ENV !== 'local' ? [ApolloServerSentryPlugin] : []
});

export default apollo;
