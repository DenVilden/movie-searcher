import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import MovieInfo from './MovieInfo';
import {
  GET_FAVORITES_DATA,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES
} from '../../graphql/types';

const MovieInfoContainer = ({ movie }) => {
  const { data } = useQuery(GET_FAVORITES_DATA);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [removeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES);

  const isExist = data.favorites.some(favorite => favorite.id === movie.id);

  const toggleSave = useCallback(() => {
    if (isExist) {
      removeFromFavorites({ variables: { movie } });
    } else {
      addToFavorites({ variables: { movie } });
    }
  }, [addToFavorites, isExist, movie, removeFromFavorites]);

  return <MovieInfo isExist={isExist} movie={movie} toggleSave={toggleSave} />;
};

MovieInfoContainer.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    budget: PropTypes.string,
    revenue: PropTypes.string,
    overview: PropTypes.string,
    backdrop_path: PropTypes.string,
    similarMovies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        release_date: PropTypes.string,
        poster_path: PropTypes.string
      })
    )
  }).isRequired
};

export default MovieInfoContainer;
