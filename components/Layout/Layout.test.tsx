import { render } from '../../lib/setupTests';
import Layout from './Layout';

describe('layout', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <Layout>
        <div />
      </Layout>,
    );

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
