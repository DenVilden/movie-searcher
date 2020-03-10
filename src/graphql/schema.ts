import { gql } from 'apollo-boost';

export default gql`
  extend type Query {
    inputValue: String!
    favorites: [String!]!
  }

  extend type MovieInfo {
    isInFavorites: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromFavorites(id: String!): [String!]!
    setInputValue(value: String!): String!
  }
`;
