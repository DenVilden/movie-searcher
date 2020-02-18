import { gql } from 'apollo-boost';

export const GET_MOVIE_INFO = gql`
  query GetMovieInfo($id: String!) {
    movieInfo(id: $id) {
      isInFavorites @client
      id
      backdrop_path
      poster_path
      title
      overview
      budget
      revenue
      vote_average
      release_date
      similar {
        results {
          id
          title
          release_date
          poster_path
        }
      }
    }
  }
`;

export const GET_MOVIES = gql`
  query GetMovies {
    topRated {
      id
      title
      vote_average
      poster_path
    }
    upcoming {
      id
      title
      release_date
      poster_path
    }
  }
`;

export const GET_MOVIES_SEARCH = gql`
  query GetMoviesSearch($query: String!) {
    moviesSearch(query: $query) {
      id
      title
      release_date
      poster_path
    }
  }
`;

export const GET_INPUT_VALUE = gql`
  query GetInputValue {
    inputValue @client
  }
`;

export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites @client
  }
`;
