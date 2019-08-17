import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Slide } from '@material-ui/core';
import MovieInfo from '../../components/MovieInfo/MovieInfo.container';
import MoviesSimilar from '../../components/MoviesSimilar/MoviesSimilar';

const MoviePage = ({ movie }) => {
  if (!movie) return null;

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo movie={movie} />
        <MoviesSimilar movies={movie.similar.results} />
      </div>
    </Slide>
  );
};

MoviePage.defaultProps = {
  movie: undefined,
};

MoviePage.propTypes = {
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

export default memo(MoviePage);
