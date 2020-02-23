import MoviesAPI from '../datasources/Movies';

export interface Context {
  dataSources: {
    moviesAPI: MoviesAPI;
  };
}
