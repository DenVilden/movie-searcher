import { ApolloServer } from 'apollo-server-micro'
import { loader } from 'graphql.macro'

import resolvers from 'apollo/resolvers'
import MoviesAPI from 'apollo/datasource'

const server = new ApolloServer({
  dataSources: () => ({ moviesAPI: new MoviesAPI() }),
  introspection: true,
  playground: true,
  resolvers,
  typeDefs: loader('apollo/schema.graphql'),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({ path: '/api/graphql' })
