import { InMemoryCache } from "@apollo/client";
import Favorites from "../Favorites";
import {
  GetFavoritesDocument,
  GetMovieInfoDocument,
} from "../../generated/queries.generated";
import { renderApollo, fireEvent } from "../../setupTests";

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
          isInFavorites: false,
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

describe("Favorites", () => {
  it("should redirect to correct url when favorites item clicked", async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GetFavoritesDocument,
      data: { favorites: ["1"] },
    });

    const { findByTestId } = renderApollo(<Favorites />, {
      mocks,
      cache,
    });

    const iconButton = await findByTestId("icon-button");

    fireEvent.click(iconButton);

    const cardButtonElement = await findByTestId("favorites-card");

    fireEvent.click(cardButtonElement);

    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: "/movie",
      query: { id: "1" },
    });
  });

  it("should close favorites on click away", async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GetFavoritesDocument,
      data: { favorites: ["1"] },
    });

    const { findByTestId, queryByTestId } = renderApollo(<Favorites />, {
      mocks,
      cache,
    });

    const iconButton = await findByTestId("icon-button");

    fireEvent.click(iconButton);

    const dropdownElement = await findByTestId("dropdown");

    // fireEvent.keyDown(searchBar, { key: 'Escape', code: 27 });
    fireEvent.click(dropdownElement.firstChild as Element);

    expect(queryByTestId("dropdown")).toBeNull();
  });

  it("should render error on open favorites", async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GetFavoritesDocument,
      data: { favorites: ["1"] },
    });

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
      cache,
    });

    const iconButton = await findByTestId("icon-button");

    fireEvent.click(iconButton);

    const errorElement = await findByText(/an error has occurred/i);

    expect(errorElement).toBeTruthy();
  });
});
