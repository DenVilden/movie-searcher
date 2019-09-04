import React, { lazy } from 'react';
import { useQuery } from 'react-apollo';
import { GET_MOVIES } from '../graphql/queries';
import MoviesUpcoming from '../components/MoviesUpcoming';
import MoviesTopRated from '../components/MoviesTopRated';
import Spinner from '../components/Spinner';

const ErrorBoundary = lazy(() => import('../components/ErrorBoundary'));

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Spinner />;

  if (error) return <ErrorBoundary>{error.message}</ErrorBoundary>;

  return (
    <main>
      <MoviesUpcoming movies={data.upcoming} />
      <MoviesTopRated movies={data.topRated} />
    </main>
  );
};

export default HomePage;
