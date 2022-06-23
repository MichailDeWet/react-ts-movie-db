import ICastMember from "./ICastMember";
import ICrewMember from "./ICrewMember";
import IGenre from "./IGenre";

/**
 * A movie for the detailed page.
 *
 * @export
 * @interface IDetailedMovie
 */
export default interface IDetailedMovie {
  backdrop_path: string;
  cast: ICastMember[];
  crew: ICrewMember[];
  genres: IGenre[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  videos: {
    id: string;
    results: [
      {
        name: string;
        key: string;
        site: string;
        official: boolean;
      }
    ];
  };
}

/**
 * A type used for API calls.
 *
 * @export
 * @interface IDetailedMovie
 */
export type TDetailedMovieWithAppend = Omit<IDetailedMovie, "cast" | "crew"> & {
  casts: {
    cast: ICastMember[];
    crew: ICrewMember[];
  };
};
