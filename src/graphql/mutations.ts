import { gql } from 'apollo-boost';

export const SET_INPUT_VALUE = gql`
  mutation SetInputValue($value: String!) {
    setInputValue(value: $value) @client
  }
`;

export const ADD_OR_REMOVE_FROM_FAVORITES = gql`
  mutation AddOrRemoveFromFavorites($id: String!) {
    addOrRemoveFromFavorites(id: $id) @client
  }
`;
