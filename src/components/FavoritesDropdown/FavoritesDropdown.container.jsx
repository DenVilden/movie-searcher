import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import FavoritesDropdown from './FavoritesDropdown';
import { CLEAR_INPUT_VALUE, GET_FAVORITES } from '../../graphql/types';

const FavoritesDropdownContainer = ({ history }) => {
  const { data } = useQuery(GET_FAVORITES);
  const [clearInputValue] = useMutation(CLEAR_INPUT_VALUE);

  return (
    <FavoritesDropdown
      clearInputValue={clearInputValue}
      favorites={data.favorites}
      history={history}
    />
  );
};

FavoritesDropdownContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(FavoritesDropdownContainer);
