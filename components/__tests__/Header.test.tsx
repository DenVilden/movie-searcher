import { renderApollo, fireEvent, screen } from 'lib/setupTests'
import Header from '../Header'

describe('header', () => {
  it('should toggle theme and save to local storage', async () => {
    const { baseElement } = renderApollo(<Header />)

    const button = screen.getByLabelText(/theme switch/i)

    fireEvent.click(button)

    expect(baseElement).toMatchSnapshot()
  })
})
