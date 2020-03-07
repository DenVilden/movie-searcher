import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { Context } from '../datasources/Movies';

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

export type MoviesSearch = {
  __typename?: 'MoviesSearch';
  cursor?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  results: Array<MoviesSearchResults>;
};

export type MoviesSearchResults = {
  __typename?: 'MoviesSearchResults';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
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
  id: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type SimilarMovies = {
  __typename?: 'SimilarMovies';
  cursor?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  results: Array<SimilarResults>;
};

export type SimilarResults = {
  __typename?: 'SimilarResults';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
};

export type TopRated = {
  __typename?: 'TopRated';
  total_pages: Scalars['Int'];
  page: Scalars['Int'];
  results: Array<TopRatedResults>;
};

export type TopRatedResults = {
  __typename?: 'TopRatedResults';
  id: Scalars['Int'];
  title: Scalars['String'];
  vote_average: Scalars['Float'];
  poster_path?: Maybe<Scalars['String']>;
};

export type Upcoming = {
  __typename?: 'Upcoming';
  total_pages: Scalars['Int'];
  page: Scalars['Int'];
  results: Array<UpcomingResults>;
};

export type UpcomingResults = {
  __typename?: 'UpcomingResults';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

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
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Upcoming: ResolverTypeWrapper<Upcoming>;
  UpcomingResults: ResolverTypeWrapper<UpcomingResults>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TopRated: ResolverTypeWrapper<TopRated>;
  TopRatedResults: ResolverTypeWrapper<TopRatedResults>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  MoviesSearch: ResolverTypeWrapper<MoviesSearch>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  MoviesSearchResults: ResolverTypeWrapper<MoviesSearchResults>;
  MovieInfo: ResolverTypeWrapper<MovieInfo>;
  SimilarMovies: ResolverTypeWrapper<SimilarMovies>;
  SimilarResults: ResolverTypeWrapper<SimilarResults>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Int: Scalars['Int'];
  Upcoming: Upcoming;
  UpcomingResults: UpcomingResults;
  String: Scalars['String'];
  TopRated: TopRated;
  TopRatedResults: TopRatedResults;
  Float: Scalars['Float'];
  MoviesSearch: MoviesSearch;
  Boolean: Scalars['Boolean'];
  MoviesSearchResults: MoviesSearchResults;
  MovieInfo: MovieInfo;
  SimilarMovies: SimilarMovies;
  SimilarResults: SimilarResults;
  CacheControlScope: CacheControlScope;
  Upload: Scalars['Upload'];
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
  similar?: Resolver<ResolversTypes['SimilarMovies'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MoviesSearchResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MoviesSearchResults'] = ResolversParentTypes['MoviesSearchResults']
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

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  upcoming?: Resolver<
    ResolversTypes['Upcoming'],
    ParentType,
    Context,
    QueryUpcomingArgs
  >;
  topRated?: Resolver<
    ResolversTypes['TopRated'],
    ParentType,
    Context,
    QueryTopRatedArgs
  >;
  moviesSearch?: Resolver<
    ResolversTypes['MoviesSearch'],
    ParentType,
    Context,
    RequireFields<QueryMoviesSearchArgs, 'query'>
  >;
  movieInfo?: Resolver<
    ResolversTypes['MovieInfo'],
    ParentType,
    Context,
    RequireFields<QueryMovieInfoArgs, 'id'>
  >;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SimilarResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SimilarResults'] = ResolversParentTypes['SimilarResults']
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  MovieInfo?: MovieInfoResolvers<ContextType>;
  MoviesSearch?: MoviesSearchResolvers<ContextType>;
  MoviesSearchResults?: MoviesSearchResultsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SimilarMovies?: SimilarMoviesResolvers<ContextType>;
  SimilarResults?: SimilarResultsResolvers<ContextType>;
  TopRated?: TopRatedResolvers<ContextType>;
  TopRatedResults?: TopRatedResultsResolvers<ContextType>;
  Upcoming?: UpcomingResolvers<ContextType>;
  UpcomingResults?: UpcomingResultsResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;