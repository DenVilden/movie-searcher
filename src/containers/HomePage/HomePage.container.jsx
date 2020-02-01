import React, { lazy } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIES } from '../../graphql/queries';
import Spinner from '../../components/Spinner';
import HomePage from './HomePage';

const ErrorMessage = lazy(() => import('../ErrorMessage'));

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return <HomePage topRated={data.topRated} upcoming={data.upcoming} />;
};
