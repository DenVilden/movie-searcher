/* eslint-disable camelcase */
export default interface GetMovieInfo {
  id: string;
  title: string;
  release_date: string;
  vote_average: number;
  budget: string;
  revenue: string;
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  similar: {
    results: {
      id: string;
      title: string;
      release_date: string;
      poster_path: string | null;
    }[];
  };
}
