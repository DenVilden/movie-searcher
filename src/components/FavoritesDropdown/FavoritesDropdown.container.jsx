import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import FavoritesDropdown from './FavoritesDropdown';
import {
  GET_FAVORITES,
  GET_FAVORITES_STATE,
  SET_INPUT_VALUE,
  TOGGLE_FAVORITES,
} from '../../graphql/types';

const FavoritesDropdownContainer = ({ history }) => {
  const {
    data: { favorites },
  } = useQuery(GET_FAVORITES);
  const {
    data: { favoritesOpen },
  } = useQuery(GET_FAVORITES_STATE);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);
  const [toggleFavoritesOpen] = useMutation(TOGGLE_FAVORITES);

  return (
    <FavoritesDropdown
      setInputValue={setInputValue}
      favorites={favorites}
      open={favoritesOpen}
      history={history}
      toggleFavoritesOpen={toggleFavoritesOpen}
    />
  );
};

FavoritesDropdownContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(FavoritesDropdownContainer);
