import * as Types from "./types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type GetMovieInfoQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;

export type GetMovieInfoQuery = { __typename?: "Query" } & {
  movieInfo?: Types.Maybe<
    { __typename?: "MovieInfo" } & Pick<
      Types.MovieInfo,
      | "isInFavorites"
      | "id"
      | "backdrop_path"
      | "poster_path"
      | "title"
      | "overview"
      | "budget"
      | "revenue"
      | "vote_average"
      | "release_date"
    > & {
        similar: { __typename?: "SimilarMovies" } & {
          results: Array<
            { __typename?: "SimilarResults" } & Pick<
              Types.SimilarResults,
              "id" | "title" | "release_date" | "poster_path"
            >
          >;
        };
      }
  >;
};

export type GetMoviesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetMoviesQuery = { __typename?: "Query" } & {
  upcoming: { __typename?: "Upcoming" } & Pick<
    Types.Upcoming,
    "total_pages" | "page"
  > & {
      results: Array<
        { __typename?: "UpcomingResults" } & Pick<
          Types.UpcomingResults,
          "id" | "title" | "release_date" | "poster_path"
        >
      >;
    };
  topRated: { __typename?: "TopRated" } & Pick<
    Types.TopRated,
    "total_pages" | "page"
  > & {
      results: Array<
        { __typename?: "TopRatedResults" } & Pick<
          Types.TopRatedResults,
          "id" | "title" | "vote_average" | "poster_path"
        >
      >;
    };
};

export type GetUpcomingQueryVariables = Types.Exact<{
  page?: Types.Maybe<Types.Scalars["Int"]>;
}>;

export type GetUpcomingQuery = { __typename?: "Query" } & {
  upcoming: { __typename?: "Upcoming" } & Pick<
    Types.Upcoming,
    "total_pages" | "page"
  > & {
      results: Array<
        { __typename?: "UpcomingResults" } & Pick<
          Types.UpcomingResults,
          "id" | "title" | "release_date" | "poster_path"
        >
      >;
    };
};

export type GetTopRatedQueryVariables = Types.Exact<{
  page?: Types.Maybe<Types.Scalars["Int"]>;
}>;

export type GetTopRatedQuery = { __typename?: "Query" } & {
  topRated: { __typename?: "TopRated" } & Pick<
    Types.TopRated,
    "total_pages" | "page"
  > & {
      results: Array<
        { __typename?: "TopRatedResults" } & Pick<
          Types.TopRatedResults,
          "id" | "title" | "vote_average" | "poster_path"
        >
      >;
    };
};

export type GetMoviesSearchQueryVariables = Types.Exact<{
  query: Types.Scalars["String"];
  pageSize?: Types.Maybe<Types.Scalars["Int"]>;
}>;

export type GetMoviesSearchQuery = { __typename?: "Query" } & {
  moviesSearch: { __typename?: "MoviesSearch" } & {
    results: Array<
      { __typename?: "MoviesSearchResults" } & Pick<
        Types.MoviesSearchResults,
        "id" | "title"
      >
    >;
  };
};

export type GetFavoritesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetFavoritesQuery = { __typename?: "Query" } & Pick<
  Types.Query,
  "favorites"
>;

export const GetMovieInfoDocument = gql`
  query GetMovieInfo($id: ID!) {
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
  baseOptions: Apollo.QueryHookOptions<
    GetMovieInfoQuery,
    GetMovieInfoQueryVariables
  >
) {
  return Apollo.useQuery<GetMovieInfoQuery, GetMovieInfoQueryVariables>(
    GetMovieInfoDocument,
    baseOptions
  );
}
export function useGetMovieInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMovieInfoQuery,
    GetMovieInfoQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetMovieInfoQuery, GetMovieInfoQueryVariables>(
    GetMovieInfoDocument,
    baseOptions
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
  baseOptions?: Apollo.QueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>
) {
  return Apollo.useQuery<GetMoviesQuery, GetMoviesQueryVariables>(
    GetMoviesDocument,
    baseOptions
  );
}
export function useGetMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMoviesQuery,
    GetMoviesQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetMoviesQuery, GetMoviesQueryVariables>(
    GetMoviesDocument,
    baseOptions
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
  >
) {
  return Apollo.useQuery<GetUpcomingQuery, GetUpcomingQueryVariables>(
    GetUpcomingDocument,
    baseOptions
  );
}
export function useGetUpcomingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUpcomingQuery,
    GetUpcomingQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetUpcomingQuery, GetUpcomingQueryVariables>(
    GetUpcomingDocument,
    baseOptions
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
  >
) {
  return Apollo.useQuery<GetTopRatedQuery, GetTopRatedQueryVariables>(
    GetTopRatedDocument,
    baseOptions
  );
}
export function useGetTopRatedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTopRatedQuery,
    GetTopRatedQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetTopRatedQuery, GetTopRatedQueryVariables>(
    GetTopRatedDocument,
    baseOptions
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
  >
) {
  return Apollo.useQuery<GetMoviesSearchQuery, GetMoviesSearchQueryVariables>(
    GetMoviesSearchDocument,
    baseOptions
  );
}
export function useGetMoviesSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMoviesSearchQuery,
    GetMoviesSearchQueryVariables
  >
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
  baseOptions?: Apollo.QueryHookOptions<
    GetFavoritesQuery,
    GetFavoritesQueryVariables
  >
) {
  return Apollo.useQuery<GetFavoritesQuery, GetFavoritesQueryVariables>(
    GetFavoritesDocument,
    baseOptions
  );
}
export function useGetFavoritesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFavoritesQuery,
    GetFavoritesQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetFavoritesQuery, GetFavoritesQueryVariables>(
    GetFavoritesDocument,
    baseOptions
  );
}
export type GetFavoritesQueryHookResult = ReturnType<
  typeof useGetFavoritesQuery
>;
export type GetFavoritesLazyQueryHookResult = ReturnType<
  typeof useGetFavoritesLazyQuery
>;
export type GetFavoritesQueryResult = Apollo.QueryResult<
  GetFavoritesQuery,
  GetFavoritesQueryVariables
>;
