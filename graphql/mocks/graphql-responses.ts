export const mockUpcoming = {
  page: 1,
  total_pages: 12,
  results: [
    {
      id: 602269,
      title: 'The Little Things',
      poster_path:
        'https://image.tmdb.org/t/p/w200/c7VlGCCgM9GZivKSzBgzuOVxQn7.jpg',
      release_date: '28.01.2021',
    },
    {
      id: 560144,
      title: 'Skylines',
      poster_path: null,
      release_date: '25.10.2020',
    },
  ],
};

export const mockTopRated = {
  page: 1,
  total_pages: 421,
  results: [
    {
      id: 761053,
      title: "Gabriel's Inferno Part III",
      vote_average: 8.9,
      poster_path:
        'https://image.tmdb.org/t/p/w200/fYtHxTxlhzD4QWfEbrC1rypysSD.jpg',
    },
  ],
};

export const mockMoviesSearch = {
  results: [
    {
      id: 516151,
      title: 'Brad Upton: Will Be Funny For Money',
      media_type: 'movie',
    },
    {
      title: 'Doctors',
      id: 5080,
      media_type: 'tv',
    },
  ],
};

export const mockMovieInfo = {
  id: 556678,
  title: 'Emma.',
  release_date: '13 February 2020',
  vote_average: 7.1,
  budget: '$0',
  revenue: '$25,155,355',
  overview:
    'In 1800s England, a well-meaning but selfish young woman meddles in the love lives of her friends.',
  backdrop_path:
    'https://image.tmdb.org/t/p/w500/5GbkL9DDRzq3A21nR7Gkv6cFGjq.jpg',
  poster_path:
    'https://image.tmdb.org/t/p/w200/uHpHzbHLSsVmAuuGuQSpyVDZmDc.jpg',
  media_type: 'movie',
  similar: {
    results: [
      {
        id: 410117,
        title: 'Lady Macbeth',
        release_date: '2016',
        poster_path:
          'https://image.tmdb.org/t/p/w200/xWTJbhTwSTJmhLlX5xAOxPhdnXc.jpg',
        media_type: 'movie',
      },
    ],
  },
};

export const mockTvShowInfo = {
  backdrop_path:
    'https://image.tmdb.org/t/p/w500/df4V825ahcsw4qKuFTEefippoCG.jpg',
  release_date: '19 November 1994',
  id: 888,
  title: 'Spider-Man',
  number_of_episodes: 65,
  number_of_seasons: 5,
  overview:
    'Bitten by a radioactive spider, Peter Parker develops spider-like superpowers. He uses these to fight crime while trying to balance it with the struggles of his personal life.',
  poster_path:
    'https://image.tmdb.org/t/p/w200/wXthtEN5kdWA1bHz03lkuCJS6hA.jpg',
  vote_average: 8.2,
  media_type: 'tv',
  similar: {
    results: [
      {
        id: 2098,
        title: 'Batman: The Animated Series',
        release_date: '1992',
        poster_path:
          'https://image.tmdb.org/t/p/w200/7ZsnVtDtkMiuMirKSZdaLaU4wMR.jpg',
        media_type: 'tv',
      },
    ],
  },
};
