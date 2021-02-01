import { renderApollo } from "../../setupTests";
import Pagination from "./Pagination";

describe("pagination", () => {
  it("should take a snapshot", () => {
    const { asFragment } = renderApollo(
      <Pagination
        refetch={jest.fn()}
        totalPages={10}
        currentPage={1}
        scrollToTop={{} as React.MutableRefObject<null>}
      />
    );

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
