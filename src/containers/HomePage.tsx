import React, { lazy } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIES } from '../graphql/queries';
import Spinner from '../components/Spinner';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import GetMovie from '../types/GetMovie';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

const HomePage = () => {
  const { loading, error, data } = useQuery<{
    upcoming: GetMovie[];
    topRated: GetMovie[];
  }>(GET_MOVIES);

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data) throw new Error('Not found');

  return (
    <main>
      <MoviesBox movies={data.upcoming} title="Upcoming" />
      <MoviesBox movies={data.topRated} title="Top Rated" />
    </main>
  );
};

export default HomePage;
