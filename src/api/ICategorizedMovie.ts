import IMovie from "./IMovie";

/**
 * Movie categories.
 *
 * @export
 * @enum {number}
 */
export enum MOVIE_CATEGORIES {
  DISCOVER = "Discover",
  TRENDING = "Trending",
  POPULAR = "Popular",
  TOP_RATED = "Top Rated",
  SEARCH = "Search",
  SIMILAR = "Similar",
}

/**
 * A list of movies with a category.
 *
 * @export
 * @interface ICategorizedMovie
 */
export default interface ICategorizedMovie {
  category: MOVIE_CATEGORIES;
  movies: IMovie[];
}
