import { GraphQLResolveInfo } from "graphql";
import { Context } from "../../datasources/Movies";
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
  __typename?: "UpcomingResults";
  id: Scalars["Int"];
  title: Scalars["String"];
  release_date: Scalars["String"];
  poster_path?: Maybe<Scalars["String"]>;
};

export type Upcoming = {
  __typename?: "Upcoming";
  total_pages: Scalars["Int"];
  page: Scalars["Int"];
  results: Array<UpcomingResults>;
};

export type TopRatedResults = {
  __typename?: "TopRatedResults";
  id: Scalars["Int"];
  title: Scalars["String"];
  vote_average: Scalars["Float"];
  poster_path?: Maybe<Scalars["String"]>;
};

export type TopRated = {
  __typename?: "TopRated";
  total_pages: Scalars["Int"];
  page: Scalars["Int"];
  results: Array<TopRatedResults>;
};

export type MoviesSearchResults = {
  __typename?: "MoviesSearchResults";
  id: Scalars["Int"];
  title: Scalars["String"];
};

export type MoviesSearch = {
  __typename?: "MoviesSearch";
  cursor?: Maybe<Scalars["Int"]>;
  hasMore?: Maybe<Scalars["Boolean"]>;
  results: Array<MoviesSearchResults>;
};

export type SimilarResults = {
  __typename?: "SimilarResults";
  id: Scalars["Int"];
  title: Scalars["String"];
  release_date?: Maybe<Scalars["String"]>;
  poster_path?: Maybe<Scalars["String"]>;
};

export type SimilarMovies = {
  __typename?: "SimilarMovies";
  cursor?: Maybe<Scalars["Int"]>;
  hasMore?: Maybe<Scalars["Boolean"]>;
  results: Array<SimilarResults>;
};

export type MovieInfo = {
  __typename?: "MovieInfo";
  id: Scalars["Int"];
  title: Scalars["String"];
  release_date: Scalars["String"];
  vote_average: Scalars["Float"];
  budget: Scalars["String"];
  revenue: Scalars["String"];
  overview?: Maybe<Scalars["String"]>;
  poster_path?: Maybe<Scalars["String"]>;
  backdrop_path?: Maybe<Scalars["String"]>;
  similar: SimilarMovies;
};

export type Query = {
  __typename?: "Query";
  upcoming: Upcoming;
  topRated: TopRated;
  moviesSearch: MoviesSearch;
  movieInfo: MovieInfo;
};

export type QueryUpcomingArgs = {
  page?: Maybe<Scalars["Int"]>;
};

export type QueryTopRatedArgs = {
  page?: Maybe<Scalars["Int"]>;
};

export type QueryMoviesSearchArgs = {
  query: Scalars["String"];
  cursor?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
};

export type QueryMovieInfoArgs = {
  id: Scalars["ID"];
  cursor?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
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
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  UpcomingResults: ResolverTypeWrapper<UpcomingResults>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Upcoming: ResolverTypeWrapper<Upcoming>;
  TopRatedResults: ResolverTypeWrapper<TopRatedResults>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  TopRated: ResolverTypeWrapper<TopRated>;
  MoviesSearchResults: ResolverTypeWrapper<MoviesSearchResults>;
  MoviesSearch: ResolverTypeWrapper<MoviesSearch>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  SimilarResults: ResolverTypeWrapper<SimilarResults>;
  SimilarMovies: ResolverTypeWrapper<SimilarMovies>;
  MovieInfo: ResolverTypeWrapper<MovieInfo>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  UpcomingResults: UpcomingResults;
  Int: Scalars["Int"];
  String: Scalars["String"];
  Upcoming: Upcoming;
  TopRatedResults: TopRatedResults;
  Float: Scalars["Float"];
  TopRated: TopRated;
  MoviesSearchResults: MoviesSearchResults;
  MoviesSearch: MoviesSearch;
  Boolean: Scalars["Boolean"];
  SimilarResults: SimilarResults;
  SimilarMovies: SimilarMovies;
  MovieInfo: MovieInfo;
  Query: {};
  ID: Scalars["ID"];
}>;

export type UpcomingResultsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["UpcomingResults"] = ResolversParentTypes["UpcomingResults"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpcomingResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Upcoming"] = ResolversParentTypes["Upcoming"]
> = ResolversObject<{
  total_pages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  results?: Resolver<
    Array<ResolversTypes["UpcomingResults"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopRatedResultsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["TopRatedResults"] = ResolversParentTypes["TopRatedResults"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopRatedResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["TopRated"] = ResolversParentTypes["TopRated"]
> = ResolversObject<{
  total_pages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  results?: Resolver<
    Array<ResolversTypes["TopRatedResults"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoviesSearchResultsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["MoviesSearchResults"] = ResolversParentTypes["MoviesSearchResults"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoviesSearchResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["MoviesSearch"] = ResolversParentTypes["MoviesSearch"]
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  results?: Resolver<
    Array<ResolversTypes["MoviesSearchResults"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SimilarResultsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["SimilarResults"] = ResolversParentTypes["SimilarResults"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  release_date?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  poster_path?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SimilarMoviesResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["SimilarMovies"] = ResolversParentTypes["SimilarMovies"]
> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  results?: Resolver<
    Array<ResolversTypes["SimilarResults"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["MovieInfo"] = ResolversParentTypes["MovieInfo"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  budget?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  revenue?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  backdrop_path?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  similar?: Resolver<ResolversTypes["SimilarMovies"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  upcoming?: Resolver<
    ResolversTypes["Upcoming"],
    ParentType,
    ContextType,
    RequireFields<QueryUpcomingArgs, "page">
  >;
  topRated?: Resolver<
    ResolversTypes["TopRated"],
    ParentType,
    ContextType,
    RequireFields<QueryTopRatedArgs, "page">
  >;
  moviesSearch?: Resolver<
    ResolversTypes["MoviesSearch"],
    ParentType,
    ContextType,
    RequireFields<QueryMoviesSearchArgs, "query" | "cursor" | "pageSize">
  >;
  movieInfo?: Resolver<
    ResolversTypes["MovieInfo"],
    ParentType,
    ContextType,
    RequireFields<QueryMovieInfoArgs, "id" | "cursor" | "pageSize">
  >;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  UpcomingResults?: UpcomingResultsResolvers<ContextType>;
  Upcoming?: UpcomingResolvers<ContextType>;
  TopRatedResults?: TopRatedResultsResolvers<ContextType>;
  TopRated?: TopRatedResolvers<ContextType>;
  MoviesSearchResults?: MoviesSearchResultsResolvers<ContextType>;
  MoviesSearch?: MoviesSearchResolvers<ContextType>;
  SimilarResults?: SimilarResultsResolvers<ContextType>;
  SimilarMovies?: SimilarMoviesResolvers<ContextType>;
  MovieInfo?: MovieInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
