import Favorites from "./Favorites";
import { GetMovieInfoDocument, MovieInfo } from "../../graphql";
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
  favoritesVar([mocks[0].result.data.movieInfo as MovieInfo]);

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
});
