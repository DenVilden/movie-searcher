import { gql } from 'apollo-server-express';

export default gql`
  type Upcoming {
    id: Int!
    title: String!
    release_date: String!
    poster_path: String
  }

  type TopRated {
    id: Int!
    title: String!
    vote_average: Float!
    poster_path: String
  }

  type MoviesSearch {
    id: Int!
    title: String!
    release_date: String!
    poster_path: String
  }

  type SimilarMovies {
    id: Int!
    title: String!
    release_date: String!
    poster_path: String
  }

  type SimilarResults {
    results: [SimilarMovies!]!
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
    similar: SimilarResults!
  }

  type Query {
    upcoming: [Upcoming!]!
    topRated: [TopRated!]!
    moviesSearch(query: String!): [MoviesSearch!]!
    movieInfo(id: String!): MovieInfo!
  }
`;
