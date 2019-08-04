import {
  FETCH_UPCOMING_START,
  FETCH_UPCOMING_SUCCESS,
  FETCH_UPCOMING_FAILURE
} from '../constants/upcoming.types';

const initialState = {
  data: [],
  isFetching: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_UPCOMING_START:
      return { ...state, isFetching: true, error: null };

    case FETCH_UPCOMING_SUCCESS:
      return { ...state, isFetching: false, data: payload, error: null };

    case FETCH_UPCOMING_FAILURE:
      return { ...state, error: payload };

    default:
      return state;
  }
};
