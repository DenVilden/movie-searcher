/* eslint-disable import/prefer-default-export */
import {
  FETCH_MOVIE_START,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
} from '../types/movie.types';
import movieApi from '../api/movie-database';

const fetchMovieStart = () => ({
  type: FETCH_MOVIE_START
});

const fetchMovieSuccess = movies => ({
  type: FETCH_MOVIE_SUCCESS,
  payload: movies
});

const fetchMovieFailure = errorMessage => ({
  type: FETCH_MOVIE_FAILURE,
  payload: errorMessage
});

export const fetchMovie = id => dispatch => {
  dispatch(fetchMovieStart());

  movieApi
    .get(`/movie/${id}`)
    .then(({ data }) => dispatch(fetchMovieSuccess(data)))
    .catch(({ message }) => dispatch(fetchMovieFailure(message)));
};
