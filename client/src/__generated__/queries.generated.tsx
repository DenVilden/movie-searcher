import { gql } from 'apollo-boost';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import * as Types from './types';

export type GetMovieInfoQueryVariables = {
  id: Types.Scalars['String'];
};

export type GetMovieInfoQuery = { __typename?: 'Query' } & {
  movieInfo: { __typename?: 'MovieInfo' } & Pick<
    Types.MovieInfo,
    | 'isInFavorites'
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
            Types.SimilarResults,
            'id' | 'title' | 'release_date' | 'poster_path'
          >
        >;
      };
    };
};

export type GetMoviesQueryVariables = {
  page?: Types.Maybe<Types.Scalars['Int']>;
};

export type GetMoviesQuery = { __typename?: 'Query' } & {
  upcoming: { __typename?: 'Upcoming' } & Pick<
    Types.Upcoming,
    'total_pages' | 'page'
  > & {
      results: Array<
        { __typename?: 'UpcomingResults' } & Pick<
          Types.UpcomingResults,
          'id' | 'title' | 'release_date' | 'poster_path'
        >
      >;
    };
  topRated: { __typename?: 'TopRated' } & Pick<
    Types.TopRated,
    'total_pages' | 'page'
  > & {
      results: Array<
        { __typename?: 'TopRatedResults' } & Pick<
          Types.TopRatedResults,
          'id' | 'title' | 'vote_average' | 'poster_path'
        >
      >;
    };
};

export type GetUpcomingQueryVariables = {
  page?: Types.Maybe<Types.Scalars['Int']>;
};

export type GetUpcomingQuery = { __typename?: 'Query' } & {
  upcoming: { __typename?: 'Upcoming' } & Pick<
    Types.Upcoming,
    'total_pages' | 'page'
  > & {
      results: Array<
        { __typename?: 'UpcomingResults' } & Pick<
          Types.UpcomingResults,
          'id' | 'title' | 'release_date' | 'poster_path'
        >
      >;
    };
};

export type GetTopRatedQueryVariables = {
  page?: Types.Maybe<Types.Scalars['Int']>;
};

export type GetTopRatedQuery = { __typename?: 'Query' } & {
  topRated: { __typename?: 'TopRated' } & Pick<
    Types.TopRated,
    'total_pages' | 'page'
  > & {
      results: Array<
        { __typename?: 'TopRatedResults' } & Pick<
          Types.TopRatedResults,
          'id' | 'title' | 'vote_average' | 'poster_path'
        >
      >;
    };
};

export type GetMoviesSearchQueryVariables = {
  query: Types.Scalars['String'];
  cursor?: Types.Maybe<Types.Scalars['Int']>;
};

export type GetMoviesSearchQuery = { __typename?: 'Query' } & {
  moviesSearch: { __typename?: 'MoviesSearch' } & Pick<
    Types.MoviesSearch,
    'cursor' | 'hasMore'
  > & {
      results: Array<
        { __typename?: 'MoviesSearchResults' } & Pick<
          Types.MoviesSearchResults,
          'id' | 'title' | 'release_date' | 'poster_path'
        >
      >;
    };
};

export type GetInputValueQueryVariables = {};

export type GetInputValueQuery = { __typename?: 'Query' } & Pick<
  Types.Query,
  'inputValue'
>;

export type GetFavoritesQueryVariables = {};

export type GetFavoritesQuery = { __typename?: 'Query' } & Pick<
  Types.Query,
  'favorites'
>;

export const GetMovieInfoDocument = gql`
  query GetMovieInfo($id: String!) {
    movieInfo(id: $id) {
      isInFavorites @client
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMovieInfoQuery,
    GetMovieInfoQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetMovieInfoQuery,
    GetMovieInfoQueryVariables
  >(GetMovieInfoDocument, baseOptions);
}
export function useGetMovieInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMovieInfoQuery,
    GetMovieInfoQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetMovieInfoQuery,
    GetMovieInfoQueryVariables
  >(GetMovieInfoDocument, baseOptions);
}
export type GetMovieInfoQueryHookResult = ReturnType<
  typeof useGetMovieInfoQuery
>;
export type GetMovieInfoLazyQueryHookResult = ReturnType<
  typeof useGetMovieInfoLazyQuery
>;
export type GetMovieInfoQueryResult = ApolloReactCommon.QueryResult<
  GetMovieInfoQuery,
  GetMovieInfoQueryVariables
>;
export const GetMoviesDocument = gql`
  query GetMovies($page: Int) {
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
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetMoviesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMoviesQuery,
    GetMoviesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetMoviesQuery, GetMoviesQueryVariables>(
    GetMoviesDocument,
    baseOptions
  );
}
export function useGetMoviesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMoviesQuery,
    GetMoviesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetMoviesQuery, GetMoviesQueryVariables>(
    GetMoviesDocument,
    baseOptions
  );
}
export type GetMoviesQueryHookResult = ReturnType<typeof useGetMoviesQuery>;
export type GetMoviesLazyQueryHookResult = ReturnType<
  typeof useGetMoviesLazyQuery
>;
export type GetMoviesQueryResult = ApolloReactCommon.QueryResult<
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUpcomingQuery,
    GetUpcomingQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetUpcomingQuery, GetUpcomingQueryVariables>(
    GetUpcomingDocument,
    baseOptions
  );
}
export function useGetUpcomingLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUpcomingQuery,
    GetUpcomingQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetUpcomingQuery,
    GetUpcomingQueryVariables
  >(GetUpcomingDocument, baseOptions);
}
export type GetUpcomingQueryHookResult = ReturnType<typeof useGetUpcomingQuery>;
export type GetUpcomingLazyQueryHookResult = ReturnType<
  typeof useGetUpcomingLazyQuery
>;
export type GetUpcomingQueryResult = ApolloReactCommon.QueryResult<
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetTopRatedQuery,
    GetTopRatedQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetTopRatedQuery, GetTopRatedQueryVariables>(
    GetTopRatedDocument,
    baseOptions
  );
}
export function useGetTopRatedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetTopRatedQuery,
    GetTopRatedQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetTopRatedQuery,
    GetTopRatedQueryVariables
  >(GetTopRatedDocument, baseOptions);
}
export type GetTopRatedQueryHookResult = ReturnType<typeof useGetTopRatedQuery>;
export type GetTopRatedLazyQueryHookResult = ReturnType<
  typeof useGetTopRatedLazyQuery
>;
export type GetTopRatedQueryResult = ApolloReactCommon.QueryResult<
  GetTopRatedQuery,
  GetTopRatedQueryVariables
>;
export const GetMoviesSearchDocument = gql`
  query GetMoviesSearch($query: String!, $cursor: Int) {
    moviesSearch(query: $query, cursor: $cursor) {
      cursor
      hasMore
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
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMoviesSearchQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMoviesSearchQuery,
    GetMoviesSearchQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetMoviesSearchQuery,
    GetMoviesSearchQueryVariables
  >(GetMoviesSearchDocument, baseOptions);
}
export function useGetMoviesSearchLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMoviesSearchQuery,
    GetMoviesSearchQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
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
export type GetMoviesSearchQueryResult = ApolloReactCommon.QueryResult<
  GetMoviesSearchQuery,
  GetMoviesSearchQueryVariables
>;
export const GetInputValueDocument = gql`
  query GetInputValue {
    inputValue @client
  }
`;

/**
 * __useGetInputValueQuery__
 *
 * To run a query within a React component, call `useGetInputValueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInputValueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInputValueQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInputValueQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetInputValueQuery,
    GetInputValueQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetInputValueQuery,
    GetInputValueQueryVariables
  >(GetInputValueDocument, baseOptions);
}
export function useGetInputValueLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInputValueQuery,
    GetInputValueQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetInputValueQuery,
    GetInputValueQueryVariables
  >(GetInputValueDocument, baseOptions);
}
export type GetInputValueQueryHookResult = ReturnType<
  typeof useGetInputValueQuery
>;
export type GetInputValueLazyQueryHookResult = ReturnType<
  typeof useGetInputValueLazyQuery
>;
export type GetInputValueQueryResult = ApolloReactCommon.QueryResult<
  GetInputValueQuery,
  GetInputValueQueryVariables
>;
export const GetFavoritesDocument = gql`
  query GetFavorites {
    favorites @client
  }
`;

/**
 * __useGetFavoritesQuery__
 *
 * To run a query within a React component, call `useGetFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavoritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFavoritesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetFavoritesQuery,
    GetFavoritesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetFavoritesQuery,
    GetFavoritesQueryVariables
  >(GetFavoritesDocument, baseOptions);
}
export function useGetFavoritesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetFavoritesQuery,
    GetFavoritesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetFavoritesQuery,
    GetFavoritesQueryVariables
  >(GetFavoritesDocument, baseOptions);
}
export type GetFavoritesQueryHookResult = ReturnType<
  typeof useGetFavoritesQuery
>;
export type GetFavoritesLazyQueryHookResult = ReturnType<
  typeof useGetFavoritesLazyQuery
>;
export type GetFavoritesQueryResult = ApolloReactCommon.QueryResult<
  GetFavoritesQuery,
  GetFavoritesQueryVariables
>;
