import {
  FETCH_UPCOMING_START,
  FETCH_UPCOMING_SUCCESS,
  FETCH_UPCOMING_FAILURE
} from '../constants/upcoming.types';

export const fetchUpcomingStart = () => ({
  type: FETCH_UPCOMING_START
});

export const fetchUpcomingSuccess = movies => ({
  type: FETCH_UPCOMING_SUCCESS,
  payload: movies
});

export const fetchUpcomingFailure = error => ({
  type: FETCH_UPCOMING_FAILURE,
  payload: error
});
