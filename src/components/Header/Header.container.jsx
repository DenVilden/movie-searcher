import React, { useCallback } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import {
  GET_INPUT_VALUE,
  SET_INPUT_VALUE,
  CLEAR_INPUT_VALUE,
} from '../../graphql/types';
import Header from './Header';

const HeaderContainer = props => {
  const { data } = useQuery(GET_INPUT_VALUE);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);
  const [clearInputValue] = useMutation(CLEAR_INPUT_VALUE);

  const setValue = useCallback(
    value => setInputValue({ variables: { value } }),
    [setInputValue]
  );

  const clearValue = useCallback(() => {
    clearInputValue();
  }, [clearInputValue]);

  return (
    <Header
      clearInputValue={clearValue}
      inputValue={data.inputValue}
      setInputValue={setValue}
      {...props}
    />
  );
};

export default withRouter(HeaderContainer);
