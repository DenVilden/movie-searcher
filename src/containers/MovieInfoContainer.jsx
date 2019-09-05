import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import MovieInfo from '../components/MovieInfo';
import { GET_FAVORITES_DATA } from '../graphql/queries';
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../graphql/mutations';

const MovieInfoContainer = ({ movie }) => {
  const { data } = useQuery(GET_FAVORITES_DATA);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [removeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES);

  const isExist = data.favorites.some(favorite => favorite.id === movie.id);

  const toggleSave = () => {
    if (isExist) {
      removeFromFavorites({ variables: { movie } });
    } else {
      addToFavorites({ variables: { movie } });
    }
  };

  return <MovieInfo isExist={isExist} movie={movie} toggleSave={toggleSave} />;
};

MovieInfoContainer.defaultProps = {
  movie: null,
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
    similar: PropTypes.shape({
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          release_date: PropTypes.string,
          poster_path: PropTypes.string,
        })
      ),
    }),
  }),
};

export default MovieInfoContainer;
