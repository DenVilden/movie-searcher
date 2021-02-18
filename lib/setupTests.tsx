/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom';
import { theme } from './theme';

// eslint-disable-next-line jest/prefer-spy-on
HTMLElement.prototype.scrollIntoView = jest.fn();

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
