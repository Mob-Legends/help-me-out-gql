import { makeSchema, objectType } from 'nexus';

import path from 'path';
// import { NexusGenFieldTypes } from 'src/api-typegen';

const Query = objectType({
  description: 'Root Query',
  name: 'Query',
  definition(t) {
    t.field('hello', {
      description: 'Hi!',
      nullable: false,
      type: 'String',
      resolve() {
        return 'World';
      }
    });
  }
});

// const Mutation = objectType({
//   description: 'Root mutation',
//   name: 'Mutation',
//   definition(t) {
//   },
// });

const schema = makeSchema({
  outputs: {
    schema: path.join(__dirname, '../../schemaFiles/schema.graphql'),
    typegen: path.join(__dirname.replace(/\/lib$/, '/src'), '../api-typegen.ts')
  },
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  typegenAutoConfig: {
    contextType: 't.Context',
    sources: [
      {
        alias: 't',
        source: path.join(__dirname.replace(/\/lib$/, '/src'), './typeDefs.ts')
      }
    ]
  },
  types: [Query]
});

export default schema;
