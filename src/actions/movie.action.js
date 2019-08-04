import {
  FETCH_MOVIE_START,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
} from '../constants/movie.types';

export const fetchMovieStart = id => ({
  type: FETCH_MOVIE_START,
  payload: id
});

export const fetchMovieSuccess = movies => ({
  type: FETCH_MOVIE_SUCCESS,
  payload: movies
});

export const fetchMovieFailure = error => ({
  type: FETCH_MOVIE_FAILURE,
  payload: error
});
