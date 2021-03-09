import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '@testing-library/jest-dom';

const theme = createMuiTheme();

type RenderApolloOptions = {
  addTypeName?: boolean;
  mocks?: MockedResponse[];
};

export default function renderApollo(
  element: React.ReactElement,
  { mocks = [], addTypeName = false }: RenderApolloOptions = {},
) {
  return render(
    <MockedProvider addTypename={addTypeName} mocks={mocks}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </MockedProvider>,
  );
}
