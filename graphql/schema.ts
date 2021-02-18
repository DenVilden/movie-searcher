import { gql } from 'apollo-server-micro';

export default gql`
  type UpcomingResults {
    id: Int!
    title: String!
    release_date: String!
    poster_path: String
    media_type: String!
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
    media_type: String!
  }

  type TopRated {
    total_pages: Int!
    page: Int!
    results: [TopRatedResults!]!
  }

  type MoviesSearchResults {
    id: Int!
    title: String!
    media_type: String!
  }

  type MoviesSearch {
    cursor: Int
    hasMore: Boolean
    results: [MoviesSearchResults!]!
  }

  type SimilarResults {
    id: Int!
    title: String!
    release_date: String
    poster_path: String
    media_type: String!
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
    media_type: String!
    similar: SimilarMovies!
  }

  type TvShowInfo {
    id: Int!
    title: String!
    release_date: String!
    overview: String
    vote_average: Float!
    poster_path: String
    number_of_seasons: Int!
    number_of_episodes: Int!
    backdrop_path: String
    media_type: String!
    similar: SimilarMovies!
  }

  type Query {
    upcoming(page: Int = 1): Upcoming!
    topRated(page: Int = 1): TopRated!
    moviesSearch(
      query: String!
      cursor: Int = null
      pageSize: Int = 4
    ): MoviesSearch!
    movieInfo(id: ID!, cursor: Int = null, pageSize: Int = 4): MovieInfo!
    tvShowInfo(id: ID!, cursor: Int = null, pageSize: Int = 4): TvShowInfo!
  }
`;
