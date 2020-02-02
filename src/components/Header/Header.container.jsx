import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GET_INPUT_VALUE } from '../../graphql/queries';
import { SET_INPUT_VALUE } from '../../graphql/mutations';
import Header from './Header';

const HeaderContainer = ({ location: { pathname } }) => {
  const { data } = useQuery(GET_INPUT_VALUE);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);

  return (
    <Header
      inputValue={data.inputValue}
      isHomePage={pathname === '/'}
      setInputValue={value => setInputValue({ variables: { value } })}
    />
  );
};

HeaderContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(HeaderContainer);
