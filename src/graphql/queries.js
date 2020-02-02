import { gql } from 'apollo-boost';

export const GET_MOVIE_INFO = gql`
  query($id: String!) {
    movieInfo(id: $id) {
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
  query {
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

export const GET_SEARCH_MOVIES = gql`
  query($query: String!) {
    moviesSearch(query: $query) {
      id
      title
      release_date
      poster_path
    }
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
