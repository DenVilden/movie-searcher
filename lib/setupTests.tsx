/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import '@testing-library/jest-dom';

export const theme = createMuiTheme();
export type MaterialTheme = typeof theme;

type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypeName?: boolean;
};

export function renderApollo(
  element: React.ReactElement,
  { mocks = [], addTypeName = false }: RenderApolloOptions = {},
) {
  return render(
    <MockedProvider addTypename={addTypeName} mocks={mocks}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </MockedProvider>,
  );
}

export * from '@testing-library/react';
