import React, { useEffect, useState } from "react";
import Carousel from "@components/Carousel/Carousel";
import Hero from "@components/Hero/Hero";
import {
  fetchDiscoverMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
} from "@api/movie";
import IMovieState from "./IMovieState";

/**
 * The home page is responsible for displaying the Hero section as well
 * as the Carousels.
 *
 * @return {*}  {JSX.Element}
 */
const Home = (): JSX.Element => {
  /* The state holds 4 lists of movies belonging to a specific category. */
  const [allMovies, setAllMovies] = useState<IMovieState>({
    discoverMovies: null,
    trendingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
  });

  /* When the page is loaded, fetch 4 lists of movies as described. */
  useEffect(() => {
    void fetchDiscoverMovies().then((response) => {
      setAllMovies((prevState) => ({ ...prevState, discoverMovies: response }));
    });

    void fetchTrendingMovies().then((response) => {
      setAllMovies((prevState) => ({ ...prevState, trendingMovies: response }));
    });

    void fetchPopularMovies().then((response) => {
      setAllMovies((prevState) => ({ ...prevState, popularMovies: response }));
    });

    void fetchTopRatedMovies().then((response) => {
      setAllMovies((prevState) => ({ ...prevState, topRatedMovies: response }));
    });
  }, []);

  return (
    <section>
      {allMovies.discoverMovies && (
        <Hero
          category={allMovies.discoverMovies.category}
          movies={allMovies.discoverMovies.movies}
        />
      )}
      {allMovies.trendingMovies && (
        <Carousel input={allMovies.trendingMovies} />
      )}
      {allMovies.popularMovies && <Carousel input={allMovies.popularMovies} />}
      {allMovies.topRatedMovies && (
        <Carousel input={allMovies.topRatedMovies} />
      )}
    </section>
  );
};

export default Home;
