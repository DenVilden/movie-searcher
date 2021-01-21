import * as Types from "./types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type AddOrRemoveFromFavoritesMutationVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type AddOrRemoveFromFavoritesMutation = {
  __typename?: "Mutation";
} & Pick<Types.Mutation, "addOrRemoveFromFavorites">;

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
