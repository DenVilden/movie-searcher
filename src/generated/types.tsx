import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type Maybe<T> = T | null;
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
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type MovieInfo = {
  __typename?: 'MovieInfo';
  backdrop_path?: Maybe<Scalars['String']>;
  budget: Scalars['String'];
  id: Scalars['Int'];
  isInFavorites: Scalars['Boolean'];
  overview?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  release_date: Scalars['String'];
  revenue: Scalars['String'];
  similar: SimilarResults;
  title: Scalars['String'];
  vote_average: Scalars['Float'];
};

export type MoviesSearch = {
  __typename?: 'MoviesSearch';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  addOrRemoveFromFavorites: Array<Scalars['String']>;
  setInputValue: Scalars['String'];
};

export type MutationAddOrRemoveFromFavoritesArgs = {
  id: Scalars['String'];
};

export type MutationSetInputValueArgs = {
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  favorites: Array<Scalars['String']>;
  inputValue: Scalars['String'];
  movieInfo: MovieInfo;
  moviesSearch: Array<MoviesSearch>;
  topRated: Array<TopRated>;
  upcoming: Array<Upcoming>;
};

export type QueryMovieInfoArgs = {
  id: Scalars['String'];
};

export type QueryMoviesSearchArgs = {
  query: Scalars['String'];
};

export type SimilarMovies = {
  __typename?: 'SimilarMovies';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
};

export type SimilarResults = {
  __typename?: 'SimilarResults';
  results: Array<SimilarMovies>;
};

export type TopRated = {
  __typename?: 'TopRated';
  id: Scalars['Int'];
  title: Scalars['String'];
  vote_average: Scalars['Float'];
  poster_path?: Maybe<Scalars['String']>;
};

export type Upcoming = {
  __typename?: 'Upcoming';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
};

export type SetInputValueMutationVariables = {
  value: Scalars['String'];
};

export type SetInputValueMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'setInputValue'
>;

export type AddOrRemoveFromFavoritesMutationVariables = {
  id: Scalars['String'];
};

export type AddOrRemoveFromFavoritesMutation = {
  __typename?: 'Mutation';
} & Pick<Mutation, 'addOrRemoveFromFavorites'>;

export type GetMovieInfoQueryVariables = {
  id: Scalars['String'];
};

export type GetMovieInfoQuery = { __typename?: 'Query' } & {
  movieInfo: { __typename?: 'MovieInfo' } & Pick<
    MovieInfo,
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
      similar: { __typename?: 'SimilarResults' } & {
        results: Array<
          { __typename?: 'SimilarMovies' } & Pick<
            SimilarMovies,
            'id' | 'title' | 'release_date' | 'poster_path'
          >
        >;
      };
    };
};

export type GetMoviesQueryVariables = {};

export type GetMoviesQuery = { __typename?: 'Query' } & {
  topRated: Array<
    { __typename?: 'TopRated' } & Pick<
      TopRated,
      'id' | 'title' | 'vote_average' | 'poster_path'
    >
  >;
  upcoming: Array<
    { __typename?: 'Upcoming' } & Pick<
      Upcoming,
      'id' | 'title' | 'release_date' | 'poster_path'
    >
  >;
};

export type GetMoviesSearchQueryVariables = {
  query: Scalars['String'];
};

export type GetMoviesSearchQuery = { __typename?: 'Query' } & {
  moviesSearch: Array<
    { __typename?: 'MoviesSearch' } & Pick<
      MoviesSearch,
      'id' | 'title' | 'release_date' | 'poster_path'
    >
  >;
};

export type GetInputValueQueryVariables = {};

export type GetInputValueQuery = { __typename?: 'Query' } & Pick<
  Query,
  'inputValue'
>;

export type GetFavoritesQueryVariables = {};

export type GetFavoritesQuery = { __typename?: 'Query' } & Pick<
  Query,
  'favorites'
>;

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
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
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean;

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
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  MovieInfo: ResolverTypeWrapper<MovieInfo>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  SimilarResults: ResolverTypeWrapper<SimilarResults>;
  SimilarMovies: ResolverTypeWrapper<SimilarMovies>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  MoviesSearch: ResolverTypeWrapper<MoviesSearch>;
  TopRated: ResolverTypeWrapper<TopRated>;
  Upcoming: ResolverTypeWrapper<Upcoming>;
  Mutation: ResolverTypeWrapper<{}>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: Scalars['String'];
  MovieInfo: MovieInfo;
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
  SimilarResults: SimilarResults;
  SimilarMovies: SimilarMovies;
  Float: Scalars['Float'];
  MoviesSearch: MoviesSearch;
  TopRated: TopRated;
  Upcoming: Upcoming;
  Mutation: {};
  CacheControlScope: CacheControlScope;
  Upload: Scalars['Upload'];
}>;

export type MovieInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MovieInfo'] = ResolversParentTypes['MovieInfo']
> = ResolversObject<{
  backdrop_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  budget?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isInFavorites?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revenue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  similar?: Resolver<ResolversTypes['SimilarResults'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MoviesSearchResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MoviesSearch'] = ResolversParentTypes['MoviesSearch']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  addOrRemoveFromFavorites?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddOrRemoveFromFavoritesArgs, 'id'>
  >;
  setInputValue?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationSetInputValueArgs, 'value'>
  >;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  favorites?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  inputValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  movieInfo?: Resolver<
    ResolversTypes['MovieInfo'],
    ParentType,
    ContextType,
    RequireFields<QueryMovieInfoArgs, 'id'>
  >;
  moviesSearch?: Resolver<
    Array<ResolversTypes['MoviesSearch']>,
    ParentType,
    ContextType,
    RequireFields<QueryMoviesSearchArgs, 'query'>
  >;
  topRated?: Resolver<
    Array<ResolversTypes['TopRated']>,
    ParentType,
    ContextType
  >;
  upcoming?: Resolver<
    Array<ResolversTypes['Upcoming']>,
    ParentType,
    ContextType
  >;
}>;

export type SimilarMoviesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SimilarMovies'] = ResolversParentTypes['SimilarMovies']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SimilarResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SimilarResults'] = ResolversParentTypes['SimilarResults']
> = ResolversObject<{
  results?: Resolver<
    Array<ResolversTypes['SimilarMovies']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TopRatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TopRated'] = ResolversParentTypes['TopRated']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UpcomingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Upcoming'] = ResolversParentTypes['Upcoming']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  MovieInfo?: MovieInfoResolvers<ContextType>;
  MoviesSearch?: MoviesSearchResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SimilarMovies?: SimilarMoviesResolvers<ContextType>;
  SimilarResults?: SimilarResultsResolvers<ContextType>;
  TopRated?: TopRatedResolvers<ContextType>;
  Upcoming?: UpcomingResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export const SetInputValueDocument = gql`
  mutation SetInputValue($value: String!) {
    setInputValue(value: $value) @client
  }
`;
export type SetInputValueMutationFn = ApolloReactCommon.MutationFunction<
  SetInputValueMutation,
  SetInputValueMutationVariables
>;

/**
 * __useSetInputValueMutation__
 *
 * To run a mutation, you first call `useSetInputValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetInputValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setInputValueMutation, { data, loading, error }] = useSetInputValueMutation({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useSetInputValueMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetInputValueMutation,
    SetInputValueMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SetInputValueMutation,
    SetInputValueMutationVariables
  >(SetInputValueDocument, baseOptions);
}
export type SetInputValueMutationHookResult = ReturnType<
  typeof useSetInputValueMutation
>;
export type SetInputValueMutationResult = ApolloReactCommon.MutationResult<
  SetInputValueMutation
>;
export type SetInputValueMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetInputValueMutation,
  SetInputValueMutationVariables
>;
export const AddOrRemoveFromFavoritesDocument = gql`
  mutation AddOrRemoveFromFavorites($id: String!) {
    addOrRemoveFromFavorites(id: $id) @client
  }
`;
export type AddOrRemoveFromFavoritesMutationFn = ApolloReactCommon.MutationFunction<
  AddOrRemoveFromFavoritesMutation,
  AddOrRemoveFromFavoritesMutationVariables
>;

/**
 * __useAddOrRemoveFromFavoritesMutation__
 *
 * To run a mutation, you first call `useAddOrRemoveFromFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrRemoveFromFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrRemoveFromFavoritesMutation, { data, loading, error }] = useAddOrRemoveFromFavoritesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddOrRemoveFromFavoritesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddOrRemoveFromFavoritesMutation,
    AddOrRemoveFromFavoritesMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddOrRemoveFromFavoritesMutation,
    AddOrRemoveFromFavoritesMutationVariables
  >(AddOrRemoveFromFavoritesDocument, baseOptions);
}
export type AddOrRemoveFromFavoritesMutationHookResult = ReturnType<
  typeof useAddOrRemoveFromFavoritesMutation
>;
export type AddOrRemoveFromFavoritesMutationResult = ApolloReactCommon.MutationResult<
  AddOrRemoveFromFavoritesMutation
>;
export type AddOrRemoveFromFavoritesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddOrRemoveFromFavoritesMutation,
  AddOrRemoveFromFavoritesMutationVariables
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
  query GetMovies {
    topRated {
      id
      title
      vote_average
      poster_path
    }
    upcoming {
      id
      title
      release_date
      poster_path
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
export const GetMoviesSearchDocument = gql`
  query GetMoviesSearch($query: String!) {
    moviesSearch(query: $query) {
      id
      title
      release_date
      poster_path
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
