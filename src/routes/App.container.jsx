import React from 'react';
import { useQuery } from 'react-apollo';
import { GET_INPUT_VALUE } from '../graphql/types';
import App from './App';

const AppContainer = () => {
  const { data } = useQuery(GET_INPUT_VALUE);

  return <App inputValue={data.inputValue} />;
};

export default AppContainer;
