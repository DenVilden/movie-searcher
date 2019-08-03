import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  TOGGLE_FAVORITES_OPEN
} from '../types/favorites.types';

const initialState = {
  open: false,
  data: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_FAVORITES_OPEN:
      return { ...state, open: !state.open };

    case ADD_TO_FAVORITES:
      return { ...state, data: [...state.data, payload] };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        data: state.data.filter(favorite => favorite.id !== payload)
      };

    default:
      return state;
  }
};
