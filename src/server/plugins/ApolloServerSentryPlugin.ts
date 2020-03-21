import * as Sentry from '@sentry/node';
import { RewriteFrames, Debug } from '@sentry/integrations';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';

Sentry.init({
  environment: process.env.APP_ENV,
  release: `${process.env.APP_NAME}-${process.env.APP_REVISION}` || '0.0.1',
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new RewriteFrames({
      root: process.cwd()
    }),
    new Debug({ stringify: true })
  ]
});

export const ApolloServerSentryPlugin = {
  requestDidStart() {
    return {
      didEncounterErrors(context) {
        Sentry.withScope(scope => {
          scope.addEventProcessor(event =>
            Sentry.Handlers.parseRequest(event, context?.context?.req)
          );
          scope.setTags({
            graphql: context?.operation?.operation || 'parse_err',
            graphqlName:
              context?.operationName || context?.request?.operationName
          });
          context.errors.forEach(error => {
            if (error.path || error.name !== 'GraphQLError') {
              scope.setExtras({
                path: error.path
              });
              Sentry.captureException(error);
            } else {
              scope.setExtras({});
              Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`);
            }
          });
        });
      }
    };
  }
} as ApolloServerPlugin;
