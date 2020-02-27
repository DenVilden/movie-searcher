import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import defaultResolvers from './graphql/resolvers';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const theme = createMuiTheme();

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
      <ThemeProvider theme={theme}>
        <Router>{element}</Router>
      </ThemeProvider>
    </MockedProvider>
  );

export * from '@testing-library/react';
