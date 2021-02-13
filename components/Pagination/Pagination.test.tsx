import { renderApollo } from '../../lib/setupTests';
import Pagination from './Pagination';

describe('pagination', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(
      <Pagination
        refetch={jest.fn()}
        totalPages={10}
        currentPage={1}
        element={{} as React.MutableRefObject<null>}
      />,
    );

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
