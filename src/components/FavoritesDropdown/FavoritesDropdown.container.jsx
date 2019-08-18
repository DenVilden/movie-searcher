import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import FavoritesDropdown from './FavoritesDropdown';
import { GET_FAVORITES, SET_INPUT_VALUE } from '../../graphql/types';

const FavoritesDropdownContainer = ({ history }) => {
  const { data } = useQuery(GET_FAVORITES);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);

  return (
    <FavoritesDropdown
      setInputValue={setInputValue}
      favorites={data.favorites}
      history={history}
    />
  );
};

FavoritesDropdownContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(FavoritesDropdownContainer);
