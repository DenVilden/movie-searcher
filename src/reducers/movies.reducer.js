import {
  FETCH_MOVIES_START,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  CLEAR_MOVIES
} from '../constants/movies.types';

const initialState = {
  data: [],
  isFetching: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIES_START:
      return { ...state, isFetching: true, error: null };

    case FETCH_MOVIES_SUCCESS:
      return { ...state, isFetching: false, data: payload, error: null };

    case FETCH_MOVIES_FAILURE:
      return { ...state, error: payload };

    case CLEAR_MOVIES:
      return { ...state, isFetching: false, data: [], error: null };

    default:
      return state;
  }
};
