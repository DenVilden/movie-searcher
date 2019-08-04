import {
  FETCH_RATED_START,
  FETCH_RATED_SUCCESS,
  FETCH_RATED_FAILURE
} from '../constants/rated.types';

const initialState = {
  data: [],
  isFetching: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_RATED_START:
      return { ...state, isFetching: true, error: null };

    case FETCH_RATED_SUCCESS:
      return { ...state, isFetching: false, data: payload, error: null };

    case FETCH_RATED_FAILURE:
      return { ...state, error: payload };

    default:
      return state;
  }
};
