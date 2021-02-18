module.exports = {
  client: {
    service: {
      name: 'movie searcher',
      localSchemaFile: 'graphql/schema.gql',
    },
    includes: ['apollo/**/*.gql'],
  },
};
