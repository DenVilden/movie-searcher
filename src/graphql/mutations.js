import { gql } from 'apollo-boost';

export const TOGGLE_FAVORITES = gql`
  mutation {
    toggleFavoritesOpen @client
  }
`;

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
  mutation($movie: MovieInfo!) {
    addMovieToFavorites(movie: $movie) @client
  }
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation($movie: MovieInfo!) {
    removeMovieFromFavorites(movie: $movie) @client
  }
`;
