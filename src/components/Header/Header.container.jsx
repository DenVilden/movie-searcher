import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import {
  GET_INPUT_VALUE,
  SET_INPUT_VALUE,
  CLEAR_INPUT_VALUE
} from '../../graphql/types';
import Header from './Header';

const HeaderContainer = () => {
  const {
    data: { inputValue }
  } = useQuery(GET_INPUT_VALUE);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);
  const [clearInputValue] = useMutation(CLEAR_INPUT_VALUE);

  return (
    <Header
      clearInputValue={clearInputValue}
      inputValue={inputValue}
      setInputValue={value => setInputValue({ variables: { value } })}
    />
  );
};

export default HeaderContainer;
