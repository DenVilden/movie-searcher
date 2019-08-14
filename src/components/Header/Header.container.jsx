import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import {
  GET_INPUT_VALUE,
  SET_INPUT_VALUE,
  CLEAR_INPUT_VALUE
} from '../../graphql/types';
import Header from './Header';

const HeaderContainer = props => {
  const { data } = useQuery(GET_INPUT_VALUE);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);
  const [clearInputValue] = useMutation(CLEAR_INPUT_VALUE);

  return (
    <Header
      clearInputValue={clearInputValue}
      inputValue={data.inputValue}
      setInputValue={value => setInputValue({ variables: { value } })}
      {...props}
    />
  );
};

export default withRouter(HeaderContainer);
