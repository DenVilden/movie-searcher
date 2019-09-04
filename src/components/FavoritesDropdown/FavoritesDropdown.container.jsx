import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import FavoritesDropdown from './FavoritesDropdown';
import { GET_FAVORITES } from '../../graphql/queries';
import { SET_INPUT_VALUE, TOGGLE_FAVORITES } from '../../graphql/mutations';

const FavoritesDropdownContainer = ({ history, open }) => {
  const {
    data: { favorites },
  } = useQuery(GET_FAVORITES);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);
  const [toggleFavoritesOpen] = useMutation(TOGGLE_FAVORITES);

  return (
    <FavoritesDropdown
      favorites={favorites}
      history={history}
      open={open}
      setInputValue={setInputValue}
      toggleFavoritesOpen={toggleFavoritesOpen}
    />
  );
};

FavoritesDropdownContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  open: PropTypes.bool.isRequired,
};

export default withRouter(FavoritesDropdownContainer);
