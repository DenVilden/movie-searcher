import {
  FETCH_MOVIE_START,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
} from '../constants/movie.types';

const initialState = {
  data: [],
  isFetching: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIE_START:
      return { ...state, isFetching: true, error: null };

    case FETCH_MOVIE_SUCCESS:
      return { ...state, isFetching: false, data: payload, error: null };

    case FETCH_MOVIE_FAILURE:
      return { ...state, error: payload };

    default:
      return state;
  }
};
