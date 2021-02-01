import { MoviePage } from "../pages/movie/[id]";
import { GetMovieInfoDocument } from "../graphql";
import { renderApollo, fireEvent } from "../setupTests";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      id: "1",
    },
  }),
}));

const mocks = [
  {
    request: {
      query: GetMovieInfoDocument,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        movieInfo: {
          id: 1,
          backdrop_path: null,
          poster_path: null,
          title: "test",
          overview: "test data",
          budget: "0",
          revenue: "0",
          vote_average: 5,
          release_date: "2020",
          similar: {
            results: [
              {
                id: 1,
                title: "test",
                release_date: "2020",
                poster_path: null,
              },
            ],
          },
        },
      },
    },
  },
];

describe("moviePage", () => {
  it("should render error state", async () => {
    const mockError = [
      {
        request: {
          query: GetMovieInfoDocument,
          variables: {
            id: "1",
          },
        },
        error: new Error("an error has occurred"),
      },
    ];

    const { findByText } = renderApollo(<MoviePage />, {
      mocks: mockError,
    });

    const errorElement = await findByText(/an error has occurred/i);

    expect(errorElement).toBeTruthy();
  });

  it("should toggle favorites", async () => {
    const mock = [mocks[0], mocks[0], mocks[0]];

    const { findByTestId, findByText } = renderApollo(<MoviePage />, {
      mocks: mock,
    });

    const favoritesButton = await findByTestId("favorites-button");

    fireEvent.click(favoritesButton);

    const removeButton = await findByText("Remove from favorites");

    expect(removeButton).toBeTruthy();

    fireEvent.click(favoritesButton);

    const addButton = await findByText("Add to favorites");

    expect(addButton).toBeTruthy();
  });
});
