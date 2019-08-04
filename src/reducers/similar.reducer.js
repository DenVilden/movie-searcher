import {
  FETCH_SIMILAR_START,
  FETCH_SIMILAR_SUCCESS,
  FETCH_SIMILAR_FAILURE
} from '../constants/similar.types';

const initialState = {
  data: [],
  isFetching: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SIMILAR_START:
      return { ...state, isFetching: true, error: null };

    case FETCH_SIMILAR_SUCCESS:
      return { ...state, isFetching: false, data: payload, error: null };

    case FETCH_SIMILAR_FAILURE:
      return { ...state, error: payload };

    default:
      return state;
  }
};
