import React, { lazy } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIES } from '../graphql/queries';
import MoviesUpcoming from '../components/MoviesUpcoming/MoviesUpcoming';
import MoviesTopRated from '../components/MoviesTopRated/MoviesTopRated';
import Spinner from '../components/Spinner/Spinner';

const ErrorMessage = lazy(() =>
  import('../components/ErrorMessage/ErrorMessage')
);

const HomePage = () => {
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

export default HomePage;
