import React from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { useGetMoviesQuery } from '../generated/types';

const HomePage = () => {
  const { loading, error, data } = useGetMoviesQuery();

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
