/* eslint-disable camelcase */
import axios from "axios";
import ICategorizedMovie, { MOVIE_CATEGORIES } from "./ICategorizedMovie";
import IDetailedMovie from "./IDetailedMovie";

const API_URL = process.env.REACT_APP_API_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

/**
 * Called when the homepage is loaded. Fetches a lists of movies,
 * categorized by Discover.
 *
 * @returns Promise<ICategorizedMovie>
 */
export const fetchDiscoverMovies = async (): Promise<ICategorizedMovie> => {
  const { data } = await axios.get(`${API_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
    },
  });

  return Promise.resolve({
    movies: data.results,
    category: MOVIE_CATEGORIES.DISCOVER,
  });
};

/**
 * Called when the homepage is loaded. Fetches a lists of movies,
 * categorized by Trending.
 *
 * @returns Promise<ICategorizedMovie>
 */
export const fetchTrendingMovies = async (): Promise<ICategorizedMovie> => {
  const { data } = await axios.get(`${API_URL}/trending/movie/week`, {
    params: {
      api_key: API_KEY,
    },
  });

  return Promise.resolve({
    movies: data.results,
    category: MOVIE_CATEGORIES.TRENDING,
  });
};

/**
 * Called when the homepage is loaded. Fetches a lists of movies,
 * categorized by Popular.
 *
 * @returns Promise<ICategorizedMovie>
 */
export const fetchPopularMovies = async (): Promise<ICategorizedMovie> => {
  const { data } = await axios.get(`${API_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
    },
  });

  return Promise.resolve({
    movies: data.results,
    category: MOVIE_CATEGORIES.POPULAR,
  });
};

/**
 * Called when the homepage is loaded. Fetches a lists of movies,
 * categorized by Top Rated.
 *
 * @returns Promise<ICategorizedMovie>
 */
export const fetchTopRatedMovies = async (): Promise<ICategorizedMovie> => {
  const { data } = await axios.get(`${API_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
    },
  });

  return Promise.resolve({
    movies: data.results,
    category: MOVIE_CATEGORIES.TOP_RATED,
  });
};

/**
 * Fetches a list of movies related to the searchKey query.
 *
 * @param searchKey
 * @returns Promise<ICategorizedMovie>
 */
export const fetchSearchMovies = async (
  searchKey: string
): Promise<ICategorizedMovie> => {
  const { data } = await axios.get(`${API_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: searchKey,
    },
  });

  return Promise.resolve({
    movies: data.results,
    category: MOVIE_CATEGORIES.SEARCH,
  });
};

/**
 * Called when the homepage is loaded. Fetches a lists of movies,
 * categorized by Similar.
 *
 * @returns Promise<ICategorizedMovie>
 */
export const fetchSimilarMovies = async (
  id: string
): Promise<ICategorizedMovie> => {
  const { data } = await axios.get(`${API_URL}/movie/${id}/similar`, {
    params: {
      api_key: API_KEY,
      // append_to_response: "runtime",
    },
  });

  return Promise.resolve({
    movies: data.results,
    category: MOVIE_CATEGORIES.SIMILAR,
  });
};

/**
 * Fetches the details of a movies related to the id parameter.
 *
 * @param id
 * @returns Promise<IDetailedMovie>
 */
export const fetchDetailedMovie = async (
  id: string
): Promise<IDetailedMovie> => {
  const { data } = await axios.get(`${API_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "videos,casts",
    },
  });

  return Promise.resolve({
    backdrop_path: data.backdrop_path,
    cast: data.casts.cast,
    crew: data.casts.crew,
    genres: data.genres,
    id: data.id,
    overview: data.overview,
    poster_path: data.poster_path,
    release_date: data.release_date,
    runtime: data.runtime,
    title: data.title,
    videos: data.videos,
  });
};
