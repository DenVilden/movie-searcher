import Upcoming from "../Upcoming";
import { GetUpcomingDocument, Upcoming as UpcomingType } from "../../graphql";
import { renderApollo, fireEvent } from "../../setupTests";

const mocks = [
  {
    request: {
      query: GetUpcomingDocument,
      variables: { page: 1 },
    },
    result: {
      data: {
        upcoming: {
          __typename: "Upcoming",
          total_pages: 20,
          page: 1,
          results: [
            {
              __typename: "UpcomingResults",
              id: 1,
              title: "page-1",
              release_date: "1500",
              poster_path: null,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GetUpcomingDocument,
      variables: { page: 2 },
    },
    result: {
      data: {
        upcoming: {
          __typename: "Upcoming",
          total_pages: 20,
          page: 2,
          results: [
            {
              __typename: "UpcomingResults",
              id: 2,
              title: "page-2",
              release_date: "1500",
              poster_path: null,
            },
          ],
        },
      },
    },
  },
];

describe("upcoming", () => {
  it("should render error state", async () => {
    const mockError = [
      {
        request: {
          query: GetUpcomingDocument,
          variables: { page: 2 },
        },
        error: new Error("an error has occurred"),
      },
    ];

    const { findByText, findByLabelText } = renderApollo(
      <Upcoming initialData={mocks[0].result.data.upcoming as UpcomingType} />,
      { mocks: mockError }
    );

    const pageButton = await findByLabelText("Go to next page");

    fireEvent.click(pageButton);

    const errorElement = await findByText(/an error has occurred/i);

    expect(errorElement).toBeTruthy();
  });

  it("should switch page and refetch movies", async () => {
    const { findByLabelText, findByText } = renderApollo(
      <Upcoming initialData={mocks[0].result.data.upcoming as UpcomingType} />,
      { mocks }
    );

    const pageButton = await findByLabelText("Go to next page");

    fireEvent.click(pageButton);

    expect(findByText("page-2")).toBeTruthy();
  });
});
