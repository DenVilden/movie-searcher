const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3';
  }

  willSendRequest(request) {
    request.params.set('api_key', process.env.REACT_APP_MOVIE_API_KEY);
  }

  moviesUpcomingReducer(movie) {
    return {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
    };
  }

  moviesTopRatedReducer(movie) {
    return {
      id: movie.id,
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
    };
  }

  moviesSearchReducer(movie) {
    return {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
    };
  }

  moviesSimilar(movie) {
    return {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
    };
  }

  movieInfoReducer(movie) {
    return {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      budget: movie.budget,
      revenue: movie.revenue,
      overview: movie.overview,
      backdrop_path: movie.poster_path,
      poster_path: movie.poster_path,
      similar: {
        results: Array.isArray(movie.similar.results)
          ? movie.similar.results.map(mov => this.moviesSimilar(mov))
          : [],
      },
    };
  }

  async getUpcoming() {
    const { results } = await this.get('/movie/upcoming');
    return Array.isArray(results)
      ? results.map(movie => this.moviesUpcomingReducer(movie))
      : [];
  }

  async getTopRated() {
    const { results } = await this.get('/movie/top_rated');
    return Array.isArray(results)
      ? results.map(movie => this.moviesTopRatedReducer(movie))
      : [];
  }

  async getMoviesSearch(query) {
    const { results } = await this.get('/search/movie', { query });
    return Array.isArray(results)
      ? results.map(movie => this.moviesSearchReducer(movie))
      : [];
  }

  async getMovieInfo(id) {
    const data = await this.get(`/movie/${id}`, {
      append_to_response: 'similar',
    });
    return this.movieInfoReducer(data);
  }
};
