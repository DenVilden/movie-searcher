import Header from "../Header";
import { renderApollo, fireEvent } from "../../setupTests";
import { GetMoviesSearchDocument } from "../../graphql/__generated__";

const mockHistoryPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mocks = [
  {
    request: {
      query: GetMoviesSearchDocument,
      variables: { query: "test", pageSize: 8 },
    },
    result: {
      data: {
        moviesSearch: {
          __typename: "MoviesSearch",
          results: [
            {
              __typename: "MoviesSearchResults",
              id: 1,
              title: "test-title",
            },
          ],
        },
      },
    },
  },
];

describe("header", () => {
  it("should update input with new value and fetch movies", async () => {
    const { findByPlaceholderText, findByText } = renderApollo(
      <Header testing />,
      {
        mocks,
      }
    );

    const inputElement = await findByPlaceholderText("type a movie name...");

    fireEvent.change(inputElement, { target: { value: "test" } });

    const searchResult = await findByText("test-title");

    expect(searchResult).toBeTruthy();

    expect(inputElement).toHaveProperty("value", "test");
  });

  it("should clear input value on click", async () => {
    const { findByPlaceholderText, findByTitle } = renderApollo(
      <Header testing />,
      {
        mocks,
      }
    );

    const inputElement = await findByPlaceholderText("type a movie name...");

    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(inputElement).toHaveProperty("value", "test");

    const clearButton = await findByTitle("Clear");

    fireEvent.click(clearButton);

    expect(inputElement).toHaveProperty("value", "");
  });

  it("should redirect to correct url on click", async () => {
    const { findByPlaceholderText, findByText } = renderApollo(
      <Header testing />,
      {
        mocks,
      }
    );

    const inputElement = await findByPlaceholderText("type a movie name...");

    fireEvent.change(inputElement, { target: { value: "test" } });

    const searchResult = await findByText("test-title");

    fireEvent.click(searchResult);

    expect(mockHistoryPush).toHaveBeenCalledWith("/movie/[id]", "/movie/1");
  });
});
