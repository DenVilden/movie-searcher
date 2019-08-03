import React from 'react';
import { useSelector } from 'react-redux';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import { selectRatedData } from '../../selectors/rated.selector';

const MoviesTopRated = () => {
  const movies = useSelector(selectRatedData);

  return (
    <MoviesContainer
      elevation={10}
      movies={movies.slice(0, 12)}
      padding={1}
      text="rating"
      title="Top Rated"
    />
  );
};

export default MoviesTopRated;
