import { gql } from 'apollo-server-express';
import {
  GET_FAVORITES_STATE,
  GET_FAVORITES_DATA,
  GET_INPUT_VALUE
} from './types';

export const typeDefs = gql`
  type Mutation {
    toggleFavoritesOpen: Boolean!
    addMovieToFavorites(movie: MovieInfo!): [MovieInfo]!
    removeMovieFromFavorites(movie: MovieInfo!): [MovieInfo]!
    setInputValue(value: String!): String!
    clearInputValue: String!
  }
`;

export const resolvers = {
  Mutation: {
    toggleFavoritesOpen: (_, __, { cache }) => {
      const { favoritesOpen } = cache.readQuery({
        query: GET_FAVORITES_STATE
      });

      cache.writeQuery({
        query: GET_FAVORITES_STATE,
        data: { favoritesOpen: !favoritesOpen }
      });

      return !favoritesOpen;
    },

    addMovieToFavorites: (_, { movie }, { cache }) => {
      const { favorites } = cache.readQuery({
        query: GET_FAVORITES_DATA
      });

      const newFavorites = [...favorites, movie];

      cache.writeQuery({
        query: GET_FAVORITES_DATA,
        data: { favorites: newFavorites }
      });

      return newFavorites;
    },

    removeMovieFromFavorites: (_, { movie }, { cache }) => {
      const { favorites } = cache.readQuery({
        query: GET_FAVORITES_DATA
      });

      const newFavorites = favorites.filter(
        favorite => favorite.id !== movie.id
      );

      cache.writeQuery({
        query: GET_FAVORITES_DATA,
        data: { favorites: newFavorites }
      });

      return newFavorites;
    },

    setInputValue: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: GET_INPUT_VALUE,
        data: { inputValue: value }
      });

      return value;
    },

    clearInputValue: (_, __, { cache }) => {
      const inputValue = '';

      cache.writeQuery({
        query: GET_INPUT_VALUE,
        data: { inputValue }
      });

      return inputValue;
    }
  }
};
