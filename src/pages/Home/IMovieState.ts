import ICategorizedMovie from "@api/ICategorizedMovie";

export default interface IMovieState {
  discoverMovies: ICategorizedMovie | null;
  trendingMovies: ICategorizedMovie | null;
  popularMovies: ICategorizedMovie | null;
  topRatedMovies: ICategorizedMovie | null;
}
