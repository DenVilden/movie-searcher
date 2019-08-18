import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import FavoritesDropdown from './FavoritesDropdown';
import {
  GET_FAVORITES,
  TOGGLE_FAVORITES,
  CLEAR_INPUT_VALUE,
} from '../../graphql/types';

const FavoritesDropdownContainer = ({ history }) => {
  const { data } = useQuery(GET_FAVORITES);
  const [toggleFavoritesOpen] = useMutation(TOGGLE_FAVORITES);
  const [clearInputValue] = useMutation(CLEAR_INPUT_VALUE);

  return (
    <FavoritesDropdown
      clearInputValue={clearInputValue}
      favorites={data.favorites}
      open={data.favoritesOpen}
      toggleFavorites={toggleFavoritesOpen}
      history={history}
    />
  );
};

FavoritesDropdownContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(FavoritesDropdownContainer);
