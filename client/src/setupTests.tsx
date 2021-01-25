import "cross-fetch/polyfill";
import { render } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ThemeProvider } from "styled-components";
import { ApolloCache, NormalizedCacheObject, Resolvers } from "@apollo/client";
import { theme } from "./pages/_app";
import defaultResolvers from "./graphql/resolvers";

// eslint-disable-next-line jest/prefer-spy-on
window.HTMLElement.prototype.scrollIntoView = jest.fn();

type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypeName?: boolean;
  cache?: ApolloCache<NormalizedCacheObject>;
  resolvers?: Resolvers;
};

export const renderApollo = (
  element: React.ReactElement,
  { mocks, addTypeName, resolvers, cache }: RenderApolloOptions = {}
) =>
  render(
    <MockedProvider
      addTypename={addTypeName}
      cache={cache}
      mocks={mocks}
      resolvers={resolvers || defaultResolvers}
    >
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </MockedProvider>
  );

export * from "@testing-library/react";
