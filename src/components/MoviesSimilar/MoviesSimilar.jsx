import React from 'react';
import { useSelector } from 'react-redux';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import { selectSimilarData } from '../../selectors/similar.selector';

const MoviesSimilar = () => {
  const movies = useSelector(selectSimilarData);

  return movies.length ? (
    <MoviesContainer
      elevation={10}
      movies={movies.slice(0, 6)}
      padding={1}
      title="Similar Movies"
    />
  ) : null;
};

export default MoviesSimilar;
