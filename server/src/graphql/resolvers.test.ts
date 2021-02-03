/* eslint-disable @typescript-eslint/no-explicit-any */
import resolvers from "./resolvers";
import {
  mockUpcoming,
  mockTopRated,
  mockMoviesSearch,
  mockMovieInfo,
} from "../mocks/responses";

describe("[Query.upcoming]", () => {
  const mockContext = {
    dataSources: {
      moviesAPI: { getUpcoming: jest.fn() },
    },
  };

  const { getUpcoming } = mockContext.dataSources.moviesAPI;

  it("calls upcoming", async () => {
    getUpcoming.mockReturnValueOnce(mockUpcoming);

    const res = await resolvers.Query.upcoming(
      {} as any,
      {} as any,
      mockContext as any,
      {} as any
    );

    expect(res).toStrictEqual(mockUpcoming);
  });

  it("catches upcoming error", async () => {
    getUpcoming.mockRejectedValueOnce("error");

    let errorMessage = "";

    try {
      await resolvers.Query.upcoming(
        {} as any,
        {} as any,
        mockContext as any,
        {} as any
      );
    } catch (error) {
      errorMessage = error.message;
    } finally {
      expect(errorMessage).toStrictEqual("Failed to fetch movies: error");
    }
  });
});

describe("[Query.topRated]", () => {
  const mockContext = {
    dataSources: {
      moviesAPI: { getTopRated: jest.fn() },
    },
  };

  const { getTopRated } = mockContext.dataSources.moviesAPI;

  it("calls topRated", async () => {
    getTopRated.mockReturnValueOnce(mockTopRated);

    const res = await resolvers.Query.topRated(
      {} as any,
      {} as any,
      mockContext as any,
      {} as any
    );

    expect(res).toStrictEqual(mockTopRated);
  });

  it("catches topRated error", async () => {
    getTopRated.mockRejectedValueOnce("error");

    let errorMessage = "";

    try {
      await resolvers.Query.topRated(
        {} as any,
        {} as any,
        mockContext as any,
        {} as any
      );
    } catch (error) {
      errorMessage = error.message;
    } finally {
      expect(errorMessage).toStrictEqual("Failed to fetch movies: error");
    }
  });
});

describe("[Query.moviesSearch]", () => {
  const mockContext = {
    dataSources: {
      moviesAPI: { getMoviesSearch: jest.fn() },
    },
  };

  const { getMoviesSearch } = mockContext.dataSources.moviesAPI;

  it("calls moviesSearch and preserve cursor", async () => {
    getMoviesSearch.mockReturnValueOnce(mockMoviesSearch);

    const res = await resolvers.Query.moviesSearch(
      {} as any,
      { cursor: 1, pageSize: 2 } as any,
      mockContext as any,
      {} as any
    );

    expect(res).toStrictEqual({
      ...mockMoviesSearch,
      cursor: 2,
      hasMore: false,
    });
  });

  it("catches moviesSearch error", async () => {
    getMoviesSearch.mockRejectedValueOnce("error");

    let errorMessage = "";

    try {
      await resolvers.Query.moviesSearch(
        {} as any,
        {} as any,
        mockContext as any,
        {} as any
      );
    } catch (error) {
      errorMessage = error.message;
    } finally {
      expect(errorMessage).toStrictEqual("Failed to fetch movies: error");
    }
  });
});

describe("[Query.movieInfo]", () => {
  const mockContext = {
    dataSources: {
      moviesAPI: { getMovieInfo: jest.fn() },
    },
  };

  const { getMovieInfo } = mockContext.dataSources.moviesAPI;

  it("calls movieInfo.similar and paginate results", async () => {
    getMovieInfo.mockReturnValueOnce(mockMovieInfo);

    const res = await resolvers.Query.movieInfo(
      {} as any,
      { pageSize: 1 } as any,
      mockContext as any,
      {} as any
    );

    expect(res).toStrictEqual({
      ...mockMovieInfo,
      similar: {
        results: [mockMovieInfo.similar.results[0]],
        cursor: 1,
        hasMore: true,
      },
    });
  });

  it("catches movieInfo error", async () => {
    getMovieInfo.mockRejectedValueOnce("error");

    let errorMessage = "";

    try {
      await resolvers.Query.movieInfo(
        {} as any,
        {} as any,
        mockContext as any,
        {} as any
      );
    } catch (error) {
      errorMessage = error.message;
    } finally {
      expect(errorMessage).toStrictEqual("Something went wrong: error");
    }
  });
});
