module.exports = {
  client: {
    service: {
      name: 'movie searcher',
      localSchemaFile: 'graphql/schema.graphql',
    },
    includes: ['apollo/**/*.graphql'],
  },
};
