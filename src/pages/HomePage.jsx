import React, { lazy } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIES } from '../graphql/queries';
import MoviesUpcoming from '../components/MoviesUpcoming';
import MoviesTopRated from '../components/MoviesTopRated';
import Spinner from '../components/Spinner';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return (
    <main>
      <MoviesUpcoming movies={data.upcoming} />
      <MoviesTopRated movies={data.topRated} />
    </main>
  );
};
