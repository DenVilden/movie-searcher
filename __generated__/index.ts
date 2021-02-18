import { GraphQLResolveInfo } from 'graphql';
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
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  media_type: Scalars['String'];
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
  media_type: Scalars['String'];
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
  media_type: Scalars['String'];
  similar: SimilarMovies;
};

export type TvShowInfo = {
  __typename?: 'TvShowInfo';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  vote_average: Scalars['Float'];
  number_of_seasons: Scalars['Int'];
  number_of_episodes: Scalars['Int'];
  backdrop_path?: Maybe<Scalars['String']>;
  media_type: Scalars['String'];
  similar: SimilarMovies;
};

export type Query = {
  __typename?: 'Query';
  upcoming: Upcoming;
  topRated: TopRated;
  moviesSearch: MoviesSearch;
  movieInfo: MovieInfo;
  tvShowInfo: TvShowInfo;
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

export type QueryTvShowInfoArgs = {
  id: Scalars['ID'];
  cursor?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  UpcomingResults: ResolverTypeWrapper<UpcomingResults>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Upcoming: ResolverTypeWrapper<Upcoming>;
  TopRatedResults: ResolverTypeWrapper<TopRatedResults>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  TopRated: ResolverTypeWrapper<TopRated>;
  MoviesSearchResults: ResolverTypeWrapper<MoviesSearchResults>;
  MoviesSearch: ResolverTypeWrapper<MoviesSearch>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  SimilarResults: ResolverTypeWrapper<SimilarResults>;
  SimilarMovies: ResolverTypeWrapper<SimilarMovies>;
  MovieInfo: ResolverTypeWrapper<MovieInfo>;
  TvShowInfo: ResolverTypeWrapper<TvShowInfo>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  UpcomingResults: UpcomingResults;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Upcoming: Upcoming;
  TopRatedResults: TopRatedResults;
  Float: Scalars['Float'];
  TopRated: TopRated;
  MoviesSearchResults: MoviesSearchResults;
  MoviesSearch: MoviesSearch;
  Boolean: Scalars['Boolean'];
  SimilarResults: SimilarResults;
  SimilarMovies: SimilarMovies;
  MovieInfo: MovieInfo;
  TvShowInfo: TvShowInfo;
  Query: {};
  ID: Scalars['ID'];
}>;

export type UpcomingResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpcomingResults'] = ResolversParentTypes['UpcomingResults']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpcomingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Upcoming'] = ResolversParentTypes['Upcoming']
> = ResolversObject<{
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<
    Array<ResolversTypes['UpcomingResults']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopRatedResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TopRatedResults'] = ResolversParentTypes['TopRatedResults']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopRatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TopRated'] = ResolversParentTypes['TopRated']
> = ResolversObject<{
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<
    Array<ResolversTypes['TopRatedResults']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoviesSearchResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MoviesSearchResults'] = ResolversParentTypes['MoviesSearchResults']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  media_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoviesSearchResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MoviesSearch'] = ResolversParentTypes['MoviesSearch']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  results?: Resolver<
    Array<ResolversTypes['MoviesSearchResults']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SimilarResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SimilarResults'] = ResolversParentTypes['SimilarResults']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  media_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SimilarMoviesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SimilarMovies'] = ResolversParentTypes['SimilarMovies']
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  results?: Resolver<
    Array<ResolversTypes['SimilarResults']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MovieInfo'] = ResolversParentTypes['MovieInfo']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  budget?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revenue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  backdrop_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  media_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  similar?: Resolver<ResolversTypes['SimilarMovies'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TvShowInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TvShowInfo'] = ResolversParentTypes['TvShowInfo']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  number_of_seasons?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  number_of_episodes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  backdrop_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  media_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  similar?: Resolver<ResolversTypes['SimilarMovies'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  upcoming?: Resolver<
    ResolversTypes['Upcoming'],
    ParentType,
    ContextType,
    RequireFields<QueryUpcomingArgs, 'page'>
  >;
  topRated?: Resolver<
    ResolversTypes['TopRated'],
    ParentType,
    ContextType,
    RequireFields<QueryTopRatedArgs, 'page'>
  >;
  moviesSearch?: Resolver<
    ResolversTypes['MoviesSearch'],
    ParentType,
    ContextType,
    RequireFields<QueryMoviesSearchArgs, 'query' | 'cursor' | 'pageSize'>
  >;
  movieInfo?: Resolver<
    ResolversTypes['MovieInfo'],
    ParentType,
    ContextType,
    RequireFields<QueryMovieInfoArgs, 'id' | 'cursor' | 'pageSize'>
  >;
  tvShowInfo?: Resolver<
    ResolversTypes['TvShowInfo'],
    ParentType,
    ContextType,
    RequireFields<QueryTvShowInfoArgs, 'id' | 'cursor' | 'pageSize'>
  >;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  UpcomingResults?: UpcomingResultsResolvers<ContextType>;
  Upcoming?: UpcomingResolvers<ContextType>;
  TopRatedResults?: TopRatedResultsResolvers<ContextType>;
  TopRated?: TopRatedResolvers<ContextType>;
  MoviesSearchResults?: MoviesSearchResultsResolvers<ContextType>;
  MoviesSearch?: MoviesSearchResolvers<ContextType>;
  SimilarResults?: SimilarResultsResolvers<ContextType>;
  SimilarMovies?: SimilarMoviesResolvers<ContextType>;
  MovieInfo?: MovieInfoResolvers<ContextType>;
  TvShowInfo?: TvShowInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

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
    | 'media_type'
  > & {
      similar: { __typename?: 'SimilarMovies' } & {
        results: Array<
          { __typename?: 'SimilarResults' } & Pick<
            SimilarResults,
            'id' | 'title' | 'release_date' | 'poster_path' | 'media_type'
          >
        >;
      };
    };
};

export type GetTvShowInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetTvShowInfoQuery = { __typename?: 'Query' } & {
  tvShowInfo: { __typename?: 'TvShowInfo' } & Pick<
    TvShowInfo,
    | 'id'
    | 'backdrop_path'
    | 'poster_path'
    | 'title'
    | 'overview'
    | 'number_of_episodes'
    | 'number_of_seasons'
    | 'vote_average'
    | 'release_date'
    | 'media_type'
  > & {
      similar: { __typename?: 'SimilarMovies' } & {
        results: Array<
          { __typename?: 'SimilarResults' } & Pick<
            SimilarResults,
            'id' | 'title' | 'release_date' | 'poster_path' | 'media_type'
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
        'id' | 'title' | 'media_type'
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
      media_type
      similar {
        results {
          id
          title
          release_date
          poster_path
          media_type
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
export const GetTvShowInfoDocument = gql`
  query GetTvShowInfo($id: ID!) {
    tvShowInfo(id: $id) {
      id
      backdrop_path
      poster_path
      title
      overview
      number_of_episodes
      number_of_seasons
      vote_average
      release_date
      media_type
      similar {
        results {
          id
          title
          release_date
          poster_path
          media_type
        }
      }
    }
  }
`;

/**
 * __useGetTvShowInfoQuery__
 *
 * To run a query within a React component, call `useGetTvShowInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTvShowInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTvShowInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTvShowInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTvShowInfoQuery,
    GetTvShowInfoQueryVariables
  >,
) {
  return Apollo.useQuery<GetTvShowInfoQuery, GetTvShowInfoQueryVariables>(
    GetTvShowInfoDocument,
    baseOptions,
  );
}
export function useGetTvShowInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTvShowInfoQuery,
    GetTvShowInfoQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetTvShowInfoQuery, GetTvShowInfoQueryVariables>(
    GetTvShowInfoDocument,
    baseOptions,
  );
}
export type GetTvShowInfoQueryHookResult = ReturnType<
  typeof useGetTvShowInfoQuery
>;
export type GetTvShowInfoLazyQueryHookResult = ReturnType<
  typeof useGetTvShowInfoLazyQuery
>;
export type GetTvShowInfoQueryResult = Apollo.QueryResult<
  GetTvShowInfoQuery,
  GetTvShowInfoQueryVariables
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
        media_type
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
