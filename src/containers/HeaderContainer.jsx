import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_INPUT_VALUE, GET_FAVORITES_STATE } from '../graphql/queries';
import { SET_INPUT_VALUE } from '../graphql/mutations';
import Header from '../components/Header';

export default () => {
  const {
    data: { favoritesOpen },
  } = useQuery(GET_FAVORITES_STATE);
  const { data } = useQuery(GET_INPUT_VALUE);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);

  return (
    <Header
      favoritesOpen={favoritesOpen}
      inputValue={data.inputValue}
      setInputValue={value => setInputValue({ variables: { value } })}
    />
  );
};
