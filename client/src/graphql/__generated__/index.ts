import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
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
  backdrop_path?: Maybe<Scalars["String"]>;
  budget: Scalars["String"];
  id: Scalars["Int"];
  isInFavorites: Scalars["Boolean"];
  overview?: Maybe<Scalars["String"]>;
  poster_path?: Maybe<Scalars["String"]>;
  release_date: Scalars["String"];
  revenue: Scalars["String"];
  similar: SimilarMovies;
  title: Scalars["String"];
  vote_average: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  favorites: Array<Scalars["String"]>;
  movieInfo?: Maybe<MovieInfo>;
  moviesSearch: MoviesSearch;
  topRated: TopRated;
  upcoming: Upcoming;
};

export type QueryMovieInfoArgs = {
  id: Scalars["ID"];
  cursor?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
};

export type QueryMoviesSearchArgs = {
  query: Scalars["String"];
  cursor?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
};

export type QueryTopRatedArgs = {
  page?: Maybe<Scalars["Int"]>;
};

export type QueryUpcomingArgs = {
  page?: Maybe<Scalars["Int"]>;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type Mutation = {
  __typename?: "Mutation";
  addOrRemoveFromFavorites: Array<Scalars["String"]>;
};

export type MutationAddOrRemoveFromFavoritesArgs = {
  id: Scalars["String"];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
  Mutation: ResolverTypeWrapper<{}>;
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
  Upload: Scalars["Upload"];
  Mutation: {};
}>;

export type CacheControlDirectiveArgs = {
  maxAge?: Maybe<Scalars["Int"]>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = CacheControlDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UpcomingResultsResolvers<
  ContextType = any,
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
  ContextType = any,
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
  ContextType = any,
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
  ContextType = any,
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
  ContextType = any,
  ParentType extends ResolversParentTypes["MoviesSearchResults"] = ResolversParentTypes["MoviesSearchResults"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoviesSearchResolvers<
  ContextType = any,
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
  ContextType = any,
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
  ContextType = any,
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
  ContextType = any,
  ParentType extends ResolversParentTypes["MovieInfo"] = ResolversParentTypes["MovieInfo"]
> = ResolversObject<{
  backdrop_path?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  budget?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isInFavorites?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  poster_path?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  release_date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  revenue?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  similar?: Resolver<ResolversTypes["SimilarMovies"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  favorites?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  movieInfo?: Resolver<
    Maybe<ResolversTypes["MovieInfo"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMovieInfoArgs, "id" | "cursor" | "pageSize">
  >;
  moviesSearch?: Resolver<
    ResolversTypes["MoviesSearch"],
    ParentType,
    ContextType,
    RequireFields<QueryMoviesSearchArgs, "query" | "cursor" | "pageSize">
  >;
  topRated?: Resolver<
    ResolversTypes["TopRated"],
    ParentType,
    ContextType,
    RequireFields<QueryTopRatedArgs, "page">
  >;
  upcoming?: Resolver<
    ResolversTypes["Upcoming"],
    ParentType,
    ContextType,
    RequireFields<QueryUpcomingArgs, "page">
  >;
}>;

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  addOrRemoveFromFavorites?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddOrRemoveFromFavoritesArgs, "id">
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
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
}>;

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<
  ContextType = any
> = DirectiveResolvers<ContextType>;
export type AddOrRemoveFromFavoritesMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AddOrRemoveFromFavoritesMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "addOrRemoveFromFavorites">;

export type GetMovieInfoQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetMovieInfoQuery = { __typename?: "Query" } & {
  movieInfo?: Maybe<
    { __typename?: "MovieInfo" } & Pick<
      MovieInfo,
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
              SimilarResults,
              "id" | "title" | "release_date" | "poster_path"
            >
          >;
        };
      }
  >;
};

export type GetMoviesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMoviesQuery = { __typename?: "Query" } & {
  upcoming: { __typename?: "Upcoming" } & Pick<
    Upcoming,
    "total_pages" | "page"
  > & {
      results: Array<
        { __typename?: "UpcomingResults" } & Pick<
          UpcomingResults,
          "id" | "title" | "release_date" | "poster_path"
        >
      >;
    };
  topRated: { __typename?: "TopRated" } & Pick<
    TopRated,
    "total_pages" | "page"
  > & {
      results: Array<
        { __typename?: "TopRatedResults" } & Pick<
          TopRatedResults,
          "id" | "title" | "vote_average" | "poster_path"
        >
      >;
    };
};

export type GetUpcomingQueryVariables = Exact<{
  page?: Maybe<Scalars["Int"]>;
}>;

export type GetUpcomingQuery = { __typename?: "Query" } & {
  upcoming: { __typename?: "Upcoming" } & Pick<
    Upcoming,
    "total_pages" | "page"
  > & {
      results: Array<
        { __typename?: "UpcomingResults" } & Pick<
          UpcomingResults,
          "id" | "title" | "release_date" | "poster_path"
        >
      >;
    };
};

export type GetTopRatedQueryVariables = Exact<{
  page?: Maybe<Scalars["Int"]>;
}>;

export type GetTopRatedQuery = { __typename?: "Query" } & {
  topRated: { __typename?: "TopRated" } & Pick<
    TopRated,
    "total_pages" | "page"
  > & {
      results: Array<
        { __typename?: "TopRatedResults" } & Pick<
          TopRatedResults,
          "id" | "title" | "vote_average" | "poster_path"
        >
      >;
    };
};

export type GetMoviesSearchQueryVariables = Exact<{
  query: Scalars["String"];
  pageSize?: Maybe<Scalars["Int"]>;
}>;

export type GetMoviesSearchQuery = { __typename?: "Query" } & {
  moviesSearch: { __typename?: "MoviesSearch" } & {
    results: Array<
      { __typename?: "MoviesSearchResults" } & Pick<
        MoviesSearchResults,
        "id" | "title"
      >
    >;
  };
};

export type GetFavoritesQueryVariables = Exact<{ [key: string]: never }>;

export type GetFavoritesQuery = { __typename?: "Query" } & Pick<
  Query,
  "favorites"
>;

export const AddOrRemoveFromFavoritesDocument = gql`
  mutation AddOrRemoveFromFavorites($id: String!) {
    addOrRemoveFromFavorites(id: $id) @client
  }
`;
export type AddOrRemoveFromFavoritesMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    AddOrRemoveFromFavoritesMutation,
    AddOrRemoveFromFavoritesMutationVariables
  >
) {
  return Apollo.useMutation<
    AddOrRemoveFromFavoritesMutation,
    AddOrRemoveFromFavoritesMutationVariables
  >(AddOrRemoveFromFavoritesDocument, baseOptions);
}
export type AddOrRemoveFromFavoritesMutationHookResult = ReturnType<
  typeof useAddOrRemoveFromFavoritesMutation
>;
export type AddOrRemoveFromFavoritesMutationResult = Apollo.MutationResult<AddOrRemoveFromFavoritesMutation>;
export type AddOrRemoveFromFavoritesMutationOptions = Apollo.BaseMutationOptions<
  AddOrRemoveFromFavoritesMutation,
  AddOrRemoveFromFavoritesMutationVariables
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
