import React from 'react';
import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import resolvers from '../graphql/resolvers';

export default withApollo(
  ({ initialState }) => {
    const client = new ApolloClient({
      typeDefs: loader('../graphql/schema.graphql'),
      resolvers,
      uri: process.env.SERVER_URL,
      cache: new InMemoryCache().restore(initialState || {}),
    });
    client.writeData({ data: { favorites: [], inputValue: '' } });
    return client;
  },
  {
    render: ({ Page, props }) => (
      // eslint-disable-next-line react/destructuring-assignment
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
  }
);
