import { ApolloServer } from 'apollo-server-express';

import schema from '../schema/index';
import logger from '../utils/logger';

const apollo = new ApolloServer({
  context: () => ({
    logger,
  }),
  schema,
  subscriptions: false,
});

export default apollo;
