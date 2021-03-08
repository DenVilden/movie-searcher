import renderApollo from 'lib/setupTests';
import Pagination from '../Pagination';

describe('pagination', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(
      <Pagination currentPage={1} path="path" totalPages={10} />,
    );

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
