import { gql } from 'apollo-boost';

export const GET_INPUT_VALUE = gql`
  query {
    inputValue @client
  }
`;

export const GET_FAVORITES = gql`
  query {
    favorites @client
  }
`;

export const GET_FAVORITES_STATE = gql`
  query {
    favoritesOpen @client
  }
`;
