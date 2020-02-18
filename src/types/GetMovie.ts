/* eslint-disable camelcase */
export default interface GetMovie {
  id: string;
  title: string;
  release_date?: string | null;
  poster_path: string | null;
  vote_average?: number;
}
