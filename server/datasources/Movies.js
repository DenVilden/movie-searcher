const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3';
  }

  willSendRequest(request) {
    request.params.set('api_key', this.context.key);
  }

  async getUpcoming() {
    const data = await this.get('/movie/upcoming');
    return data.results
      .sort((a, b) => (a.release_date < b.release_date ? 1 : -1))
      .slice(0, 12);
  }

  async getTopRated() {
    const data = await this.get('/movie/top_rated');
    return data.results.slice(0, 12);
  }

  async getMoviesSearch(query) {
    const data = await this.get('/search/movie', { query });
    return data.results.slice(0, 6);
  }

  async getMovieInfo(id) {
    const data = await this.get(`/movie/${id}`, {
      append_to_response: 'similar',
    });
    return data;
  }
};
