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
    cursor: Int
    hasMore: Boolean
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

  type MovieInfoResults {
    id: Int!
    title: String!
    release_date: String!
    vote_average: Float!
    budget: String!
    revenue: String!
    overview: String
    poster_path: String
    backdrop_path: String
  }

  type MovieInfo {
    results: MovieInfoResults!
    similar_results: [SimilarResults!]!
  }

  type Query {
    upcoming(page: Int): Upcoming!
    topRated(page: Int): TopRated!
    moviesSearch(query: String!, cursor: Int): MoviesSearch!
    movieInfo(id: String!): MovieInfo!
  }
`;
