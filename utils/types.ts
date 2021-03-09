import MoviesAPI from 'apollo/datasource';

export type Context = {
  dataSources: {
    moviesAPI: MoviesAPI;
  };
};

export type Favorite = {
  id: number;
  media_type: string;
  poster_path?: string | null;
  title: string;
};
