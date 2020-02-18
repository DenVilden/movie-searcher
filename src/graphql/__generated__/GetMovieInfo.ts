/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMovieInfo
// ====================================================

export interface GetMovieInfo_movieInfo_similar_results {
  __typename: "SimilarMovies";
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

export interface GetMovieInfo_movieInfo_similar {
  __typename: "SimilarResults";
  results: GetMovieInfo_movieInfo_similar_results[];
}

export interface GetMovieInfo_movieInfo {
  __typename: "MovieInfo";
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  overview: string | null;
  budget: string;
  revenue: string;
  vote_average: number;
  release_date: string;
  similar: GetMovieInfo_movieInfo_similar;
}

export interface GetMovieInfo {
  movieInfo: GetMovieInfo_movieInfo;
}

export interface GetMovieInfoVariables {
  id: string;
}
