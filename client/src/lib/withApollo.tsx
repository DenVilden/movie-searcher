import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { loader } from 'graphql.macro';
import { getDataFromTree } from '@apollo/react-ssr';
import resolvers from '../graphql/resolvers';

const createClient = ({ initialState }: any) => {
  const client = new ApolloClient({
    typeDefs: loader('../graphql/schema.graphql'),
    resolvers,
    uri: process.env.SERVER_URL,
    cache: new InMemoryCache().restore(initialState || {}),
  });
  client.writeQuery({
    query: gql`
      {
        favorites
        inputValue
      }
    `,
    data: { favorites: [], inputValue: '' },
  });
  return client;
};

export default withApollo(createClient, { getDataFromTree });
