/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMovies
// ====================================================

export interface GetMovies_topRated {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
}

export interface GetMovies_upcoming {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

export interface GetMovies {
  topRated: GetMovies_topRated[];
  upcoming: GetMovies_upcoming[];
}
