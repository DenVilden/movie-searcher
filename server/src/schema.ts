import { gql } from 'apollo-server-express';

export default gql`
  type UpcomingResults {
    id: Int!
    title: String!
    release_date: String!
    poster_path: String
  }

  type Upcoming {
    total_pages: Int!
    page: Int!
    results: [UpcomingResults!]!
  }

  type TopRatedResults {
    id: Int!
    title: String!
    vote_average: Float!
    poster_path: String
  }

  type TopRated {
    total_pages: Int!
    page: Int!
    results: [TopRatedResults!]!
  }

  type MoviesSearchResults {
    id: Int!
    title: String!
    release_date: String!
    poster_path: String
  }

  type MoviesSearch {
    cursor: Int
    hasMore: Boolean
    results: [MoviesSearchResults!]!
  }

  type SimilarResults {
    id: Int!
    title: String!
    release_date: String!
    poster_path: String
  }

  type SimilarMovies {
    cursor: Int
    hasMore: Boolean
    results: [SimilarResults!]!
  }

  type MovieInfo {
    id: Int!
    title: String!
    release_date: String!
    vote_average: Float!
    budget: String!
    revenue: String!
    overview: String
    poster_path: String
    backdrop_path: String
    similar: SimilarMovies!
  }

  type Query {
    upcoming(page: Int): Upcoming!
    topRated(page: Int): TopRated!
    moviesSearch(query: String!, cursor: Int, pageSize: Int): MoviesSearch!
    movieInfo(id: String!, cursor: Int, pageSize: Int): MovieInfo!
  }
`;
