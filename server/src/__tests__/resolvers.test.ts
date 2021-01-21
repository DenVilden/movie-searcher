import resolvers from "../resolvers";
import {
  mockUpcoming,
  mockTopRated,
  mockMoviesSearch,
  mockMovieInfo,
} from "../datasources/__mocks__/responses";

describe("[Query.upcoming]", () => {
  const mockContext = {
    dataSources: {
      moviesAPI: { getUpcoming: jest.fn() },
    },
  };

  const { getUpcoming } = mockContext.dataSources.moviesAPI;

  it("calls upcoming", async () => {
    getUpcoming.mockReturnValueOnce(mockUpcoming);

    if (resolvers.Query?.upcoming) {
      const res = await resolvers.Query.upcoming(
        {} as any,
        {} as any,
        mockContext as any,
        {} as any
      );
      expect(res).toEqual(mockUpcoming);
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

    if (resolvers.Query?.topRated) {
      const res = await resolvers.Query.topRated(
        {} as any,
        {} as any,
        mockContext as any,
        {} as any
      );
      expect(res).toEqual(mockTopRated);
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

    if (resolvers.Query?.moviesSearch) {
      const res = await resolvers.Query.moviesSearch(
        {} as any,
        { cursor: 1, pageSize: 2 } as any,
        mockContext as any,
        {} as any
      );
      expect(res).toEqual({ ...mockMoviesSearch, cursor: 2, hasMore: false });
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

    if (resolvers.Query?.movieInfo) {
      const res = await resolvers.Query.movieInfo(
        {} as any,
        { pageSize: 1 } as any,
        mockContext as any,
        {} as any
      );

      expect(res).toEqual({
        ...mockMovieInfo,
        similar: {
          results: [mockMovieInfo.similar.results[0]],
          cursor: 1,
          hasMore: true,
        },
      });
    }
  });
});
