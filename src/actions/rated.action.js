import {
  FETCH_RATED_START,
  FETCH_RATED_SUCCESS,
  FETCH_RATED_FAILURE
} from '../constants/rated.types';

export const fetchRatedStart = () => ({
  type: FETCH_RATED_START
});

export const fetchRatedSuccess = movies => ({
  type: FETCH_RATED_SUCCESS,
  payload: movies
});

export const fetchRatedFailure = error => ({
  type: FETCH_RATED_FAILURE,
  payload: error
});
