import Favorites from "../Favorites";
import { GetMovieInfoDocument } from "../../graphql";
import { renderApollo, fireEvent } from "../../setupTests";
import { favoritesVar } from "../../lib/apollo";

const mockHistoryPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mocks = [
  {
    request: {
      query: GetMovieInfoDocument,
      variables: { id: "1" },
    },
    result: {
      data: {
        movieInfo: {
          __typename: "MovieInfo",
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
            __typename: "SimilarMovies",
            results: [
              {
                __typename: "SimilarResults",
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

describe("favorites", () => {
  favoritesVar(["1"]);

  it("should redirect to correct url when favorites item clicked", async () => {
    const { findByTestId } = renderApollo(<Favorites />, {
      mocks,
    });

    const iconButton = await findByTestId("icon-button");

    fireEvent.click(iconButton);

    const cardButtonElement = await findByTestId("favorites-card");

    fireEvent.click(cardButtonElement);

    expect(mockHistoryPush).toHaveBeenCalledWith("/movie/1");
  });

  it("should close favorites on click away", async () => {
    const { findByTestId, queryByTestId } = renderApollo(<Favorites />, {
      mocks,
    });

    const iconButton = await findByTestId("icon-button");

    fireEvent.click(iconButton);

    const dropdownElement = await findByTestId("dropdown");

    // fireEvent.keyDown(searchBar, { key: 'Escape', code: 27 });
    fireEvent.click(dropdownElement.firstChild as Element);

    expect(queryByTestId("dropdown")).toBeNull();
  });

  it("should render error on open favorites", async () => {
    const mockError = [
      {
        request: {
          query: GetMovieInfoDocument,
          variables: { id: "1" },
        },
        error: new Error("an error has occurred"),
      },
    ];

    const { findByTestId, findByText } = renderApollo(<Favorites />, {
      mocks: mockError,
    });

    const iconButton = await findByTestId("icon-button");

    fireEvent.click(iconButton);

    const errorElement = await findByText(/an error has occurred/i);

    expect(errorElement).toBeTruthy();
  });
});
