import { renderApollo } from 'lib/setupTests'
import ErrorMessage from '../ErrorMessage'

describe('errorMessage', () => {
  it('should take a snapshot', () => {
    const { baseElement } = renderApollo(<ErrorMessage error="error" />)

    expect(baseElement).toMatchSnapshot()
  })
})
