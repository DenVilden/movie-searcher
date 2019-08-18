import gql from 'graphql-tag';

export const SET_INPUT_VALUE = gql`
  mutation($value: String!) {
    setInputValue(value: $value) @client
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
