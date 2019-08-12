import React from 'react';
import PropTypes from 'prop-types';
import { Slide } from '@material-ui/core';
import MovieInfo from '../../components/MovieInfo/MovieInfo.container';
import MoviesSimilar from '../../components/MoviesSimilar/MoviesSimilar';

const MoviePage = ({ movie }) => (
  <Slide direction="up" in>
    <div>
      <MovieInfo movie={movie} />
      <MoviesSimilar movies={movie.similarMovies} />
    </div>
  </Slide>
);

MoviePage.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.string,
    budget: PropTypes.string,
    revenue: PropTypes.string,
    overview: PropTypes.string,
    backdrop_path: PropTypes.string,
    similarMovies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        release_date: PropTypes.string,
        poster_path: PropTypes.string
      })
    )
  }).isRequired
};

export default MoviePage;
