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
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  vote_average: Scalars['Float'];
  budget: Scalars['String'];
  revenue: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
  similar: SimilarResults;
};

export type MoviesSearch = {
  __typename?: 'MoviesSearch';
  id: Scalars['Int'];
  title: Scalars['String'];
  release_date: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  upcoming: Array<Upcoming>;
  topRated: Array<TopRated>;
  moviesSearch: Array<MoviesSearch>;
  movieInfo: MovieInfo;
};

export type QueryMoviesSearchArgs = {
  query: Scalars['String'];
};

export type QueryMovieInfoArgs = {
  id: Scalars['String'];
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
  Upcoming: ResolverTypeWrapper<Upcoming>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TopRated: ResolverTypeWrapper<TopRated>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  MoviesSearch: ResolverTypeWrapper<MoviesSearch>;
  MovieInfo: ResolverTypeWrapper<MovieInfo>;
  SimilarResults: ResolverTypeWrapper<SimilarResults>;
  SimilarMovies: ResolverTypeWrapper<SimilarMovies>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Upcoming: Upcoming;
  Int: Scalars['Int'];
  String: Scalars['String'];
  TopRated: TopRated;
  Float: Scalars['Float'];
  MoviesSearch: MoviesSearch;
  MovieInfo: MovieInfo;
  SimilarResults: SimilarResults;
  SimilarMovies: SimilarMovies;
  Boolean: Scalars['Boolean'];
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
  similar?: Resolver<ResolversTypes['SimilarResults'], ParentType, ContextType>;
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

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  upcoming?: Resolver<Array<ResolversTypes['Upcoming']>, ParentType, Context>;
  topRated?: Resolver<Array<ResolversTypes['TopRated']>, ParentType, Context>;
  moviesSearch?: Resolver<
    Array<ResolversTypes['MoviesSearch']>,
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
