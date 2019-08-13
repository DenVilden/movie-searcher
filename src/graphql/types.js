import { gql } from 'apollo-boost';

export const SET_INPUT_VALUE = gql`
  mutation($value: String!) {
    setInputValue(value: $value) @client
  }
`;

export const CLEAR_INPUT_VALUE = gql`
  mutation {
    clearInputValue @client
  }
`;

export const ADD_TO_FAVORITES = gql`
  mutation($movie: Movie!) {
    addMovieToFavorites(movie: $movie) @client
  }
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation($movie: Movie!) {
    removeMovieFromFavorites(movie: $movie) @client
  }
`;

export const TOGGLE_FAVORITES = gql`
  mutation {
    toggleFavoritesOpen @client
  }
`;

export const GET_INPUT_VALUE = gql`
  query {
    inputValue @client
  }
`;

export const GET_FAVORITES_DATA = gql`
  query {
    favorites @client
  }
`;

export const GET_FAVORITES_STATE = gql`
  query {
    favoritesOpen @client
  }
`;

export const GET_FAVORITES = gql`
  query {
    favoritesOpen @client
    favorites @client
  }
`;
