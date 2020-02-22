import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { Context } from './context';

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
  isInFavorites: Scalars['Boolean'];
  results: MovieInfoResults;
  similar_results: Array<SimilarResults>;
};

export type MovieInfoResults = {
  __typename?: 'MovieInfoResults';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  vote_average: Scalars['Float'];
  budget: Scalars['String'];
  revenue: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
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

export type Mutation = {
  __typename?: 'Mutation';
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
  moviesSearch: MoviesSearch;
  topRated: TopRated;
  upcoming: Upcoming;
};

export type QueryMovieInfoArgs = {
  id: Scalars['String'];
};

export type QueryMoviesSearchArgs = {
  query: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
};

export type QueryTopRatedArgs = {
  page?: Maybe<Scalars['Int']>;
};

export type QueryUpcomingArgs = {
  page?: Maybe<Scalars['Int']>;
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
  cursor?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  MovieInfoResults: ResolverTypeWrapper<MovieInfoResults>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  SimilarResults: ResolverTypeWrapper<SimilarResults>;
  MoviesSearch: ResolverTypeWrapper<MoviesSearch>;
  MoviesSearchResults: ResolverTypeWrapper<MoviesSearchResults>;
  TopRated: ResolverTypeWrapper<TopRated>;
  TopRatedResults: ResolverTypeWrapper<TopRatedResults>;
  Upcoming: ResolverTypeWrapper<Upcoming>;
  UpcomingResults: ResolverTypeWrapper<UpcomingResults>;
  Mutation: ResolverTypeWrapper<{}>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: Scalars['String'];
  MovieInfo: MovieInfo;
  Boolean: Scalars['Boolean'];
  MovieInfoResults: MovieInfoResults;
  Int: Scalars['Int'];
  Float: Scalars['Float'];
  SimilarResults: SimilarResults;
  MoviesSearch: MoviesSearch;
  MoviesSearchResults: MoviesSearchResults;
  TopRated: TopRated;
  TopRatedResults: TopRatedResults;
  Upcoming: Upcoming;
  UpcomingResults: UpcomingResults;
  Mutation: {};
  CacheControlScope: CacheControlScope;
  Upload: Scalars['Upload'];
}>;

export type MovieInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MovieInfo'] = ResolversParentTypes['MovieInfo']
> = ResolversObject<{
  isInFavorites?: Resolver<ResolversTypes['Boolean'], ParentType, Context>;
  results?: Resolver<
    ResolversTypes['MovieInfoResults'],
    ParentType,
    ContextType
  >;
  similar_results?: Resolver<
    Array<ResolversTypes['SimilarResults']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MovieInfoResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MovieInfoResults'] = ResolversParentTypes['MovieInfoResults']
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

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  addOrRemoveFromFavorites?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    Context,
    RequireFields<MutationAddOrRemoveFromFavoritesArgs, 'id'>
  >;
  setInputValue?: Resolver<
    ResolversTypes['String'],
    ParentType,
    Context,
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
    ResolversTypes['MoviesSearch'],
    ParentType,
    ContextType,
    RequireFields<QueryMoviesSearchArgs, 'query'>
  >;
  topRated?: Resolver<
    ResolversTypes['TopRated'],
    ParentType,
    ContextType,
    QueryTopRatedArgs
  >;
  upcoming?: Resolver<
    ResolversTypes['Upcoming'],
    ParentType,
    ContextType,
    QueryUpcomingArgs
  >;
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
  cursor?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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
  MovieInfoResults?: MovieInfoResultsResolvers<ContextType>;
  MoviesSearch?: MoviesSearchResolvers<ContextType>;
  MoviesSearchResults?: MoviesSearchResultsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
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
