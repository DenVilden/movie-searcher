import * as Types from './types';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type SetInputValueMutationVariables = {
  value: Types.Scalars['String'];
};


export type SetInputValueMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'setInputValue'>
);

export type AddOrRemoveFromFavoritesMutationVariables = {
  id: Types.Scalars['String'];
};


export type AddOrRemoveFromFavoritesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'addOrRemoveFromFavorites'>
);


export const SetInputValueDocument = gql`
    mutation SetInputValue($value: String!) {
  setInputValue(value: $value) @client
}
    `;

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
export function useSetInputValueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetInputValueMutation, SetInputValueMutationVariables>) {
        return ApolloReactHooks.useMutation<SetInputValueMutation, SetInputValueMutationVariables>(SetInputValueDocument, baseOptions);
      }
export type SetInputValueMutationHookResult = ReturnType<typeof useSetInputValueMutation>;
export type SetInputValueMutationResult = ApolloReactCommon.MutationResult<SetInputValueMutation>;
export type SetInputValueMutationOptions = ApolloReactCommon.BaseMutationOptions<SetInputValueMutation, SetInputValueMutationVariables>;
export const AddOrRemoveFromFavoritesDocument = gql`
    mutation AddOrRemoveFromFavorites($id: String!) {
  addOrRemoveFromFavorites(id: $id) @client
}
    `;

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
export function useAddOrRemoveFromFavoritesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddOrRemoveFromFavoritesMutation, AddOrRemoveFromFavoritesMutationVariables>) {
        return ApolloReactHooks.useMutation<AddOrRemoveFromFavoritesMutation, AddOrRemoveFromFavoritesMutationVariables>(AddOrRemoveFromFavoritesDocument, baseOptions);
      }
export type AddOrRemoveFromFavoritesMutationHookResult = ReturnType<typeof useAddOrRemoveFromFavoritesMutation>;
export type AddOrRemoveFromFavoritesMutationResult = ApolloReactCommon.MutationResult<AddOrRemoveFromFavoritesMutation>;
export type AddOrRemoveFromFavoritesMutationOptions = ApolloReactCommon.BaseMutationOptions<AddOrRemoveFromFavoritesMutation, AddOrRemoveFromFavoritesMutationVariables>;