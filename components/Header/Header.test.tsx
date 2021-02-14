import Header from './Header';
import { renderApollo } from '../../lib/setupTests';

describe('header', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<Header />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
