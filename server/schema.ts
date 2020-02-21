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
    cursor: Int
    hasMore: Boolean
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

  type MoviesSearch {
    id: Int!
    title: String!
    release_date: String!
    poster_path: String
  }

  type SimilarResults {
    id: Int!
    title: String!
    release_date: String!
    poster_path: String
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
    similar: [SimilarResults!]!
  }

  type Query {
    upcoming(page: Int, cursor: Int): Upcoming!
    topRated(page: Int, cursor: Int): TopRated!
    moviesSearch(query: String!): [MoviesSearch!]!
    movieInfo(id: String!): MovieInfo!
  }
`;
