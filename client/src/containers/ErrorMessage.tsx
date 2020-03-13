import React from 'react';
import Error from 'next/error';
import { ApolloError } from 'apollo-boost';

type Props = {
  error: ApolloError;
};

const ErrorContainer = ({ error }: Props) => (
  <Error
    statusCode={
      error.graphQLErrors.length
        ? error.graphQLErrors[0].extensions?.response.status
        : 500
    }
    title={
      error.graphQLErrors.length
        ? error.graphQLErrors[0].extensions?.response.statusText
        : error.networkError?.message
    }
  />
);

export default ErrorContainer;
