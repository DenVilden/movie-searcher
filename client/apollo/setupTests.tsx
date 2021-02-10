import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import { theme } from '../pages/_app';

// eslint-disable-next-line jest/prefer-spy-on
HTMLElement.prototype.scrollIntoView = jest.fn();

type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypeName?: boolean;
};

export const renderApollo = (
  element: React.ReactElement,
  { mocks = [], addTypeName = false }: RenderApolloOptions = {},
) =>
  render(
    <MockedProvider addTypename={addTypeName} mocks={mocks}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </MockedProvider>,
  );

export * from '@testing-library/react';
