import { ApolloServer } from 'apollo-server-micro'
import { loader } from 'graphql.macro'

import MoviesAPI from '@/apollo/datasource'
import resolvers from '@/apollo/resolvers'

const server = new ApolloServer({
  dataSources: () => ({ moviesAPI: new MoviesAPI() }),
  resolvers,
  typeDefs: loader('apollo/schema.graphql'),
  playground: true,
  introspection: true,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({ path: '/api/graphql' })
