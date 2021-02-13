import { renderApollo } from '../../lib/setupTests';
import ErrorMessage from './ErrorMessage';

describe('errorMessage', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<ErrorMessage error="error" />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
