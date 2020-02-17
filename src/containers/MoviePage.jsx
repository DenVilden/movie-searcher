import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Slide } from '@material-ui/core';
import { GET_MOVIE_INFO, GET_FAVORITES_DATA } from '../graphql/queries';
import Spinner from '../components/Spinner';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../graphql/mutations';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

const propTypes = {
  id: PropTypes.string.isRequired,
};

const MoviePage = ({ id }) => {
  const { loading, error, data } = useQuery(GET_MOVIE_INFO, {
    variables: { id },
  });
  const {
    data: { favorites },
  } = useQuery(GET_FAVORITES_DATA);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [removeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES);

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  const isExist = favorites.some(favorite => favorite.id === data.movieInfo.id);

  const toggleSave = () => {
    if (isExist) {
      removeFromFavorites({ variables: { movie: data.movieInfo } });
    } else {
      addToFavorites({ variables: { movie: data.movieInfo } });
    }
  };

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo
          favorites={favorites}
          isExist={isExist}
          movie={data.movieInfo}
          toggleSave={toggleSave}
        />
        {data.movieInfo.similar.results.length && (
          <MoviesBox
            movies={data.movieInfo.similar.results}
            title="Similar Movies"
          />
        )}
      </div>
    </Slide>
  );
};

MoviePage.propTypes = propTypes;

export default MoviePage;
