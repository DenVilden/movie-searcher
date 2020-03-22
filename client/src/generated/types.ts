import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  Private = 'PRIVATE'
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
  similar: SimilarMovies;
  title: Scalars['String'];
  vote_average: Scalars['Float'];
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
};

export type Mutation = {
   __typename?: 'Mutation';
  addOrRemoveFromFavorites: Array<Scalars['String']>;
};


export type MutationAddOrRemoveFromFavoritesArgs = {
  id: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  favorites: Array<Scalars['String']>;
  movieInfo?: Maybe<MovieInfo>;
  moviesSearch: MoviesSearch;
  topRated: TopRated;
  upcoming: Upcoming;
};


export type QueryMovieInfoArgs = {
  id: Scalars['ID'];
  cursor?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};


export type QueryMoviesSearchArgs = {
  query: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};


export type QueryTopRatedArgs = {
  page?: Maybe<Scalars['Int']>;
};


export type QueryUpcomingArgs = {
  page?: Maybe<Scalars['Int']>;
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

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  MovieInfo: ResolverTypeWrapper<MovieInfo>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  SimilarMovies: ResolverTypeWrapper<SimilarMovies>,
  SimilarResults: ResolverTypeWrapper<SimilarResults>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  MoviesSearch: ResolverTypeWrapper<MoviesSearch>,
  MoviesSearchResults: ResolverTypeWrapper<MoviesSearchResults>,
  TopRated: ResolverTypeWrapper<TopRated>,
  TopRatedResults: ResolverTypeWrapper<TopRatedResults>,
  Upcoming: ResolverTypeWrapper<Upcoming>,
  UpcomingResults: ResolverTypeWrapper<UpcomingResults>,
  Mutation: ResolverTypeWrapper<{}>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  ID: Scalars['ID'],
  Int: Scalars['Int'],
  MovieInfo: MovieInfo,
  Boolean: Scalars['Boolean'],
  SimilarMovies: SimilarMovies,
  SimilarResults: SimilarResults,
  Float: Scalars['Float'],
  MoviesSearch: MoviesSearch,
  MoviesSearchResults: MoviesSearchResults,
  TopRated: TopRated,
  TopRatedResults: TopRatedResults,
  Upcoming: Upcoming,
  UpcomingResults: UpcomingResults,
  Mutation: {},
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
}>;

export type MovieInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieInfo'] = ResolversParentTypes['MovieInfo']> = ResolversObject<{
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  budget?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  isInFavorites?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  revenue?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  similar?: Resolver<ResolversTypes['SimilarMovies'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  vote_average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MoviesSearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoviesSearch'] = ResolversParentTypes['MoviesSearch']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  results?: Resolver<Array<ResolversTypes['MoviesSearchResults']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MoviesSearchResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoviesSearchResults'] = ResolversParentTypes['MoviesSearchResults']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addOrRemoveFromFavorites?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationAddOrRemoveFromFavoritesArgs, 'id'>>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  favorites?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  movieInfo?: Resolver<Maybe<ResolversTypes['MovieInfo']>, ParentType, ContextType, RequireFields<QueryMovieInfoArgs, 'id' | 'cursor' | 'pageSize'>>,
  moviesSearch?: Resolver<ResolversTypes['MoviesSearch'], ParentType, ContextType, RequireFields<QueryMoviesSearchArgs, 'query' | 'cursor' | 'pageSize'>>,
  topRated?: Resolver<ResolversTypes['TopRated'], ParentType, ContextType, RequireFields<QueryTopRatedArgs, 'page'>>,
  upcoming?: Resolver<ResolversTypes['Upcoming'], ParentType, ContextType, RequireFields<QueryUpcomingArgs, 'page'>>,
}>;

export type SimilarMoviesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SimilarMovies'] = ResolversParentTypes['SimilarMovies']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  results?: Resolver<Array<ResolversTypes['SimilarResults']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type SimilarResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SimilarResults'] = ResolversParentTypes['SimilarResults']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TopRatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopRated'] = ResolversParentTypes['TopRated']> = ResolversObject<{
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  results?: Resolver<Array<ResolversTypes['TopRatedResults']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TopRatedResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopRatedResults'] = ResolversParentTypes['TopRatedResults']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  vote_average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UpcomingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Upcoming'] = ResolversParentTypes['Upcoming']> = ResolversObject<{
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  results?: Resolver<Array<ResolversTypes['UpcomingResults']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UpcomingResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpcomingResults'] = ResolversParentTypes['UpcomingResults']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  MovieInfo?: MovieInfoResolvers<ContextType>,
  MoviesSearch?: MoviesSearchResolvers<ContextType>,
  MoviesSearchResults?: MoviesSearchResultsResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  SimilarMovies?: SimilarMoviesResolvers<ContextType>,
  SimilarResults?: SimilarResultsResolvers<ContextType>,
  TopRated?: TopRatedResolvers<ContextType>,
  TopRatedResults?: TopRatedResultsResolvers<ContextType>,
  Upcoming?: UpcomingResolvers<ContextType>,
  UpcomingResults?: UpcomingResultsResolvers<ContextType>,
  Upload?: GraphQLScalarType,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
