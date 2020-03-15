import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import { theme } from './pages/_app';
import defaultResolvers from './graphql/resolvers';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypeName?: boolean;
  cache?: any;
  resolvers?: any;
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

export * from '@testing-library/react';
