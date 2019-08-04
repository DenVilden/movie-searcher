import {
  CLEAR_MOVIES,
  FETCH_MOVIES_START,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from '../constants/movies.types';

export const fetchMoviesStart = query => ({
  type: FETCH_MOVIES_START,
  payload: query
});

export const fetchMoviesSuccess = movies => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies
});

export const fetchMoviesFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error
});

export const clearMovies = () => ({
  type: CLEAR_MOVIES
});
