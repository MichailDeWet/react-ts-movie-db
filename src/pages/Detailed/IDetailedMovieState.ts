import ICategorizedMovie from "@api/ICategorizedMovie";
import IDetailedMovie from "@api/IDetailedMovie";

export default interface IDetailedMovieState {
  detailedMovie: IDetailedMovie | null;
  similarMovies: ICategorizedMovie | null;
}
