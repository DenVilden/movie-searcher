import TopRated from "../TopRated";
import { GetTopRatedDocument, TopRated as TopRatedType } from "../../graphql";
import { renderApollo, fireEvent } from "../../setupTests";

const mocks = [
  {
    request: {
      query: GetTopRatedDocument,
      variables: { page: 1 },
    },
    result: {
      data: {
        topRated: {
          __typename: "TopRated",
          total_pages: 20,
          page: 1,
          results: [
            {
              __typename: "TopRatedResults",
              id: 1,
              title: "page-1",
              vote_average: 3.6,
              poster_path: null,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GetTopRatedDocument,
      variables: { page: 2 },
    },
    result: {
      data: {
        topRated: {
          __typename: "TopRated",
          total_pages: 20,
          page: 2,
          results: [
            {
              __typename: "TopRatedResults",
              id: 2,
              title: "page-2",
              vote_average: 3.6,
              poster_path: null,
            },
          ],
        },
      },
    },
  },
];

describe("topRated", () => {
  it("should render error state", async () => {
    const mockError = [
      {
        request: {
          query: GetTopRatedDocument,
          variables: { page: 2 },
        },
        error: new Error("an error has occurred"),
      },
    ];

    const { findByText, findByLabelText } = renderApollo(
      <TopRated initialData={mocks[0].result.data.topRated as TopRatedType} />,
      { mocks: mockError }
    );

    const pageButton = await findByLabelText("Go to next page");

    fireEvent.click(pageButton);

    const errorElement = await findByText(/an error has occurred/i);

    expect(errorElement).toBeTruthy();
  });

  it("should switch page and refetch movies", async () => {
    const { findByText, findByLabelText } = renderApollo(
      <TopRated initialData={mocks[0].result.data.topRated as TopRatedType} />,
      { mocks }
    );

    const pageButton = await findByLabelText("Go to next page");

    fireEvent.click(pageButton);

    expect(findByText("page-2")).toBeTruthy();
  });
});
