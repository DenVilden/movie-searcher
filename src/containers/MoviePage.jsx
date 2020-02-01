import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Slide } from '@material-ui/core';
import { GET_MOVIE_INFO } from '../graphql/queries';
import Spinner from '../components/Spinner';
import MovieInfo from '../components/MovieInfo/MovieInfo.container';
import MoviesBox from '../components/MoviesBox/MoviesBox';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

const MoviePage = ({ id }) => {
  const { loading, error, data } = useQuery(GET_MOVIE_INFO, {
    variables: { id },
  });

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo movie={data.movieInfo} />
        {data.movieInfo.similar.results && (
          <MoviesBox
            elevation={10}
            movies={data.movieInfo.similar.results}
            padding={1}
            title="Similar Movies"
          />
        )}
      </div>
    </Slide>
  );
};

MoviePage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MoviePage;
