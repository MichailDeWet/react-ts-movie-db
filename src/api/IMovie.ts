/**
 * A movie interface for less detailed movies.
 *
 * @export
 * @interface IMovie
 */
export default interface IMovie {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  vote_count: number;
}
