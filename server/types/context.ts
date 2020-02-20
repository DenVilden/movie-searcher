import MoviesAPi from '../datasources/Movies';

export interface Context {
  dataSources: {
    moviesAPI: MoviesAPi;
  };
}
