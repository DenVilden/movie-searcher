/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMoviesSearch
// ====================================================

export interface GetMoviesSearch_moviesSearch {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

export interface GetMoviesSearch {
  moviesSearch: GetMoviesSearch_moviesSearch[];
}

export interface GetMoviesSearchVariables {
  query: string;
}
