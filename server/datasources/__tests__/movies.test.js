const MoviesAPI = require('../Movies');

const mocks = {
  get: jest.fn(),
};

const api = new MoviesAPI();
api.get = mocks.get;

describe('MoviesAPI.getUpcomingMovies', () => {
  const mockUpcomingResponse = {
    results: [
      {
        popularity: 358.622,
        vote_count: 3912,
        video: false,
        poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
        id: 496243,
        adult: false,
        backdrop_path: '/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
        original_language: 'ko',
        original_title: '기생충',
        genre_ids: [35, 18, 53],
        title: 'Parasite',
        vote_average: 8.6,
        overview:
          "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
        release_date: '2019-05-30',
      },
    ],
    page: 1,
    total_results: 400,
    dates: {
      maximum: '2020-03-14',
      minimum: '2020-02-16',
    },
    total_pages: 20,
  };

  const mockUpcoming = {
    id: 496243,
    title: 'Parasite',
    release_date: '2019-05-30',
    poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  };

  it('should get get and transform upcoming movies', async () => {
    mocks.get.mockReturnValueOnce(mockUpcomingResponse);
    const res = await api.getUpcoming();

    expect(res).toEqual([mockUpcoming]);
    expect(mocks.get).toBeCalledWith('/movie/upcoming');
  });
});

describe('MoviesAPI.getTopRatedMovies', () => {
  const mockTopRatedResponse = {
    page: 1,
    total_results: 6893,
    total_pages: 345,
    results: [
      {
        popularity: 19.488,
        vote_count: 2209,
        video: false,
        poster_path: '/2CAL2433ZeIihfX1Hb2139CX0pW.jpg',
        id: 19404,
        adult: false,
        backdrop_path: '/pVGzV02qmHVoKx9ehBNy7m2u5fs.jpg',
        original_language: 'hi',
        original_title: 'दिलवाले दुल्हनिया ले जायेंगे',
        genre_ids: [35, 18, 10749],
        title: 'Dilwale Dulhania Le Jayenge',
        vote_average: 8.8,
        overview:
          'Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.',
        release_date: '1995-10-20',
      },
    ],
  };

  const mockTopRated = {
    id: 19404,
    title: 'Dilwale Dulhania Le Jayenge',
    vote_average: 8.8,
    poster_path: '/2CAL2433ZeIihfX1Hb2139CX0pW.jpg',
  };

  it('should get get and transform top rated movies ', async () => {
    mocks.get.mockReturnValueOnce(mockTopRatedResponse);
    const res = await api.getTopRated();

    expect(res).toEqual([mockTopRated]);
    expect(mocks.get).toBeCalledWith('/movie/top_rated');
  });
});

describe('MoviesAPI.getMoviesSearch', () => {
  const mockMoviesSearchResponse = {
    page: 1,
    total_results: 226,
    total_pages: 12,
    results: [
      {
        popularity: 39.63,
        vote_count: 6313,
        video: false,
        poster_path: '/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
        id: 324857,
        adult: false,
        backdrop_path: '/uUiId6cG32JSRI6RyBQSvQtLjz2.jpg',
        original_language: 'en',
        original_title: 'Spider-Man: Into the Spider-Verse',
        genre_ids: [28, 12, 16, 35, 878],
        title: 'Spider-Man: Into the Spider-Verse',
        vote_average: 8.4,
        overview:
          'Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson "Kingpin" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.',
        release_date: '2018-12-06',
      },
    ],
  };

  const mockMoviesSearch = {
    id: 324857,
    title: 'Spider-Man: Into the Spider-Verse',
    release_date: '2018-12-06',
    poster_path: '/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
  };

  it('should get get and transform search movies', async () => {
    mocks.get.mockReturnValueOnce(mockMoviesSearchResponse);
    const query = 'spider';
    const res = await api.getMoviesSearch(query);

    expect(res).toEqual([mockMoviesSearch]);
    expect(mocks.get).toBeCalledWith('/search/movie', { query });
  });
});

describe('MoviesAPI.getMovieInfo', () => {
  const mockMovieInfoResponse = {
    adult: false,
    backdrop_path: '/5GbkL9DDRzq3A21nR7Gkv6cFGjq.jpg',
    belongs_to_collection: null,
    budget: 0,
    genres: [
      { id: 35, name: 'Comedy' },
      { id: 18, name: 'Drama' },
    ],
    homepage: 'https://www.focusfeatures.com/emma',
    id: 556678,
    imdb_id: 'tt9214832',
    original_language: 'en',
    original_title: 'Emma',
    overview:
      'A young woman despite the best intentions, heedlessly meddles in people’s romantic affairs as she tries to play matchmaker.',
    popularity: 60.013,
    poster_path: '/sm8iVzA7kRp0d4BSIsgXjsSBMKV.jpg',
    production_companies: [
      {
        id: 10163,
        logo_path: '/16KWBMmfPX0aJzDExDrPxSLj0Pg.png',
        name: 'Working Title Films',
        origin_country: 'GB',
      },
      {
        id: 10146,
        logo_path: '/xnFIOeq5cKw09kCWqV7foWDe4AA.png',
        name: 'Focus Features',
        origin_country: 'US',
      },
    ],
    production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }],
    release_date: '2020-02-14',
    revenue: 0,
    runtime: 124,
    spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
    status: 'Released',
    tagline: 'Handsome, clever, and rich.',
    title: 'Emma',
    video: false,
    vote_average: 7.8,
    vote_count: 6,
    similar: {
      page: 1,
      results: [
        {
          id: 281957,
          title: 'The Revenant',
          release_date: '2015',
          poster_path: '/oXUWEc5i3wYyFnL1Ycu8ppxxPvs.jpg',
        },
      ],
      total_pages: 461,
      total_results: 9217,
    },
  };

  const mockMovieInfo = {
    id: 556678,
    title: 'Emma',
    release_date: '2020-02-14',
    vote_average: 7.8,
    budget: 0,
    revenue: 0,
    overview:
      'A young woman despite the best intentions, heedlessly meddles in people’s romantic affairs as she tries to play matchmaker.',
    backdrop_path: '/5GbkL9DDRzq3A21nR7Gkv6cFGjq.jpg',
    poster_path: '/sm8iVzA7kRp0d4BSIsgXjsSBMKV.jpg',
    similar: {
      results: [
        {
          id: 281957,
          title: 'The Revenant',
          release_date: '2015',
          poster_path: '/oXUWEc5i3wYyFnL1Ycu8ppxxPvs.jpg',
        },
      ],
    },
  };

  it('should get get and transform movie info', async () => {
    mocks.get.mockReturnValueOnce(mockMovieInfoResponse);
    const id = 556678;
    const res = await api.getMovieInfo(id);

    expect(res).toEqual(mockMovieInfo);
    expect(mocks.get).toBeCalledWith(`/movie/${id}`, {
      append_to_response: 'similar',
    });
  });
});