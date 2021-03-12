/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/preact'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import '@testing-library/jest-dom/extend-expect'

const theme = createMuiTheme()

type RenderApolloOptions = {
  addTypeName?: boolean
  mocks?: MockedResponse[]
}

export function renderApollo(
  element: React.ReactElement,
  { mocks = [], addTypeName = false }: RenderApolloOptions = {},
) {
  return render(
    <MockedProvider addTypename={addTypeName} mocks={mocks}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </MockedProvider>,
  )
}

export { screen, fireEvent } from '@testing-library/preact'
