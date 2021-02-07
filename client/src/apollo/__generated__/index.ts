import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type UpcomingResults = {
  __typename?: 'UpcomingResults';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
};

export type Upcoming = {
  __typename?: 'Upcoming';
  total_pages: Scalars['Int'];
  page: Scalars['Int'];
  results: Array<UpcomingResults>;
};

export type TopRatedResults = {
  __typename?: 'TopRatedResults';
  id: Scalars['Int'];
  title: Scalars['String'];
  vote_average: Scalars['Float'];
  poster_path?: Maybe<Scalars['String']>;
};

export type TopRated = {
  __typename?: 'TopRated';
  total_pages: Scalars['Int'];
  page: Scalars['Int'];
  results: Array<TopRatedResults>;
};

export type MoviesSearchResults = {
  __typename?: 'MoviesSearchResults';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type MoviesSearch = {
  __typename?: 'MoviesSearch';
  cursor?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  results: Array<MoviesSearchResults>;
};

export type SimilarResults = {
  __typename?: 'SimilarResults';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
};

export type SimilarMovies = {
  __typename?: 'SimilarMovies';
  cursor?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  results: Array<SimilarResults>;
};

export type MovieInfo = {
  __typename?: 'MovieInfo';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  vote_average: Scalars['Float'];
  budget: Scalars['String'];
  revenue: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
  similar: SimilarMovies;
};

export type Query = {
  __typename?: 'Query';
  upcoming: Upcoming;
  topRated: TopRated;
  moviesSearch: MoviesSearch;
  movieInfo: MovieInfo;
};

export type QueryUpcomingArgs = {
  page?: Maybe<Scalars['Int']>;
};

export type QueryTopRatedArgs = {
  page?: Maybe<Scalars['Int']>;
};

export type QueryMoviesSearchArgs = {
  query: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type QueryMovieInfoArgs = {
  id: Scalars['ID'];
  cursor?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type GetMovieInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetMovieInfoQuery = { __typename?: 'Query' } & {
  movieInfo: { __typename?: 'MovieInfo' } & Pick<
    MovieInfo,
    | 'id'
    | 'backdrop_path'
    | 'poster_path'
    | 'title'
    | 'overview'
    | 'budget'
    | 'revenue'
    | 'vote_average'
    | 'release_date'
  > & {
      similar: { __typename?: 'SimilarMovies' } & {
        results: Array<
          { __typename?: 'SimilarResults' } & Pick<
            SimilarResults,
            'id' | 'title' | 'release_date' | 'poster_path'
          >
        >;
      };
    };
};

export type GetMoviesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMoviesQuery = { __typename?: 'Query' } & {
  upcoming: { __typename?: 'Upcoming' } & Pick<
    Upcoming,
    'total_pages' | 'page'
  > & {
      results: Array<
        { __typename?: 'UpcomingResults' } & Pick<
          UpcomingResults,
          'id' | 'title' | 'release_date' | 'poster_path'
        >
      >;
    };
  topRated: { __typename?: 'TopRated' } & Pick<
    TopRated,
    'total_pages' | 'page'
  > & {
      results: Array<
        { __typename?: 'TopRatedResults' } & Pick<
          TopRatedResults,
          'id' | 'title' | 'vote_average' | 'poster_path'
        >
      >;
    };
};

export type GetUpcomingQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
}>;

export type GetUpcomingQuery = { __typename?: 'Query' } & {
  upcoming: { __typename?: 'Upcoming' } & Pick<
    Upcoming,
    'total_pages' | 'page'
  > & {
      results: Array<
        { __typename?: 'UpcomingResults' } & Pick<
          UpcomingResults,
          'id' | 'title' | 'release_date' | 'poster_path'
        >
      >;
    };
};

export type GetTopRatedQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
}>;

export type GetTopRatedQuery = { __typename?: 'Query' } & {
  topRated: { __typename?: 'TopRated' } & Pick<
    TopRated,
    'total_pages' | 'page'
  > & {
      results: Array<
        { __typename?: 'TopRatedResults' } & Pick<
          TopRatedResults,
          'id' | 'title' | 'vote_average' | 'poster_path'
        >
      >;
    };
};

export type GetMoviesSearchQueryVariables = Exact<{
  query: Scalars['String'];
  pageSize?: Maybe<Scalars['Int']>;
}>;

export type GetMoviesSearchQuery = { __typename?: 'Query' } & {
  moviesSearch: { __typename?: 'MoviesSearch' } & {
    results: Array<
      { __typename?: 'MoviesSearchResults' } & Pick<
        MoviesSearchResults,
        'id' | 'title'
      >
    >;
  };
};

export const GetMovieInfoDocument = gql`
  query GetMovieInfo($id: ID!) {
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

/**
 * __useGetMovieInfoQuery__
 *
 * To run a query within a React component, call `useGetMovieInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMovieInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMovieInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMovieInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMovieInfoQuery,
    GetMovieInfoQueryVariables
  >,
) {
  return Apollo.useQuery<GetMovieInfoQuery, GetMovieInfoQueryVariables>(
    GetMovieInfoDocument,
    baseOptions,
  );
}
export function useGetMovieInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMovieInfoQuery,
    GetMovieInfoQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetMovieInfoQuery, GetMovieInfoQueryVariables>(
    GetMovieInfoDocument,
    baseOptions,
  );
}
export type GetMovieInfoQueryHookResult = ReturnType<
  typeof useGetMovieInfoQuery
>;
export type GetMovieInfoLazyQueryHookResult = ReturnType<
  typeof useGetMovieInfoLazyQuery
>;
export type GetMovieInfoQueryResult = Apollo.QueryResult<
  GetMovieInfoQuery,
  GetMovieInfoQueryVariables
>;
export const GetMoviesDocument = gql`
  query GetMovies {
    upcoming {
      total_pages
      page
      results {
        id
        title
        release_date
        poster_path
      }
    }
    topRated {
      total_pages
      page
      results {
        id
        title
        vote_average
        poster_path
      }
    }
  }
`;

/**
 * __useGetMoviesQuery__
 *
 * To run a query within a React component, call `useGetMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMoviesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMoviesQuery,
    GetMoviesQueryVariables
  >,
) {
  return Apollo.useQuery<GetMoviesQuery, GetMoviesQueryVariables>(
    GetMoviesDocument,
    baseOptions,
  );
}
export function useGetMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMoviesQuery,
    GetMoviesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetMoviesQuery, GetMoviesQueryVariables>(
    GetMoviesDocument,
    baseOptions,
  );
}
export type GetMoviesQueryHookResult = ReturnType<typeof useGetMoviesQuery>;
export type GetMoviesLazyQueryHookResult = ReturnType<
  typeof useGetMoviesLazyQuery
>;
export type GetMoviesQueryResult = Apollo.QueryResult<
  GetMoviesQuery,
  GetMoviesQueryVariables
>;
export const GetUpcomingDocument = gql`
  query GetUpcoming($page: Int) {
    upcoming(page: $page) {
      total_pages
      page
      results {
        id
        title
        release_date
        poster_path
      }
    }
  }
`;

/**
 * __useGetUpcomingQuery__
 *
 * To run a query within a React component, call `useGetUpcomingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetUpcomingQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUpcomingQuery,
    GetUpcomingQueryVariables
  >,
) {
  return Apollo.useQuery<GetUpcomingQuery, GetUpcomingQueryVariables>(
    GetUpcomingDocument,
    baseOptions,
  );
}
export function useGetUpcomingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUpcomingQuery,
    GetUpcomingQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetUpcomingQuery, GetUpcomingQueryVariables>(
    GetUpcomingDocument,
    baseOptions,
  );
}
export type GetUpcomingQueryHookResult = ReturnType<typeof useGetUpcomingQuery>;
export type GetUpcomingLazyQueryHookResult = ReturnType<
  typeof useGetUpcomingLazyQuery
>;
export type GetUpcomingQueryResult = Apollo.QueryResult<
  GetUpcomingQuery,
  GetUpcomingQueryVariables
>;
export const GetTopRatedDocument = gql`
  query GetTopRated($page: Int) {
    topRated(page: $page) {
      total_pages
      page
      results {
        id
        title
        vote_average
        poster_path
      }
    }
  }
`;

/**
 * __useGetTopRatedQuery__
 *
 * To run a query within a React component, call `useGetTopRatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopRatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopRatedQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetTopRatedQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTopRatedQuery,
    GetTopRatedQueryVariables
  >,
) {
  return Apollo.useQuery<GetTopRatedQuery, GetTopRatedQueryVariables>(
    GetTopRatedDocument,
    baseOptions,
  );
}
export function useGetTopRatedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTopRatedQuery,
    GetTopRatedQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetTopRatedQuery, GetTopRatedQueryVariables>(
    GetTopRatedDocument,
    baseOptions,
  );
}
export type GetTopRatedQueryHookResult = ReturnType<typeof useGetTopRatedQuery>;
export type GetTopRatedLazyQueryHookResult = ReturnType<
  typeof useGetTopRatedLazyQuery
>;
export type GetTopRatedQueryResult = Apollo.QueryResult<
  GetTopRatedQuery,
  GetTopRatedQueryVariables
>;
export const GetMoviesSearchDocument = gql`
  query GetMoviesSearch($query: String!, $pageSize: Int) {
    moviesSearch(query: $query, pageSize: $pageSize) {
      results {
        id
        title
      }
    }
  }
`;

/**
 * __useGetMoviesSearchQuery__
 *
 * To run a query within a React component, call `useGetMoviesSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoviesSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetMoviesSearchQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMoviesSearchQuery,
    GetMoviesSearchQueryVariables
  >,
) {
  return Apollo.useQuery<GetMoviesSearchQuery, GetMoviesSearchQueryVariables>(
    GetMoviesSearchDocument,
    baseOptions,
  );
}
export function useGetMoviesSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMoviesSearchQuery,
    GetMoviesSearchQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetMoviesSearchQuery,
    GetMoviesSearchQueryVariables
  >(GetMoviesSearchDocument, baseOptions);
}
export type GetMoviesSearchQueryHookResult = ReturnType<
  typeof useGetMoviesSearchQuery
>;
export type GetMoviesSearchLazyQueryHookResult = ReturnType<
  typeof useGetMoviesSearchLazyQuery
>;
export type GetMoviesSearchQueryResult = Apollo.QueryResult<
  GetMoviesSearchQuery,
  GetMoviesSearchQueryVariables
>;
