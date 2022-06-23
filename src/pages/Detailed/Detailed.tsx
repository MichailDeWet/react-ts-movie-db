import React, { useCallback, useEffect, useState, MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import ICategorizedMovie from "@api/ICategorizedMovie";
import IDetailedMovie from "@api/IDetailedMovie";
import { fetchDetailedMovie, fetchSimilarMovies } from "@api/movie";
import Carousel from "@components/Carousel/Carousel";
import CastCarousel from "@components/Carousel/CastCarousel";
import HeroDetailed from "@components/Hero/HeroDetailed";
import { useTrailerContext } from "@context/detail-context";
import { deconstructQuery } from "@pages/Search/Search";
import styles from "./Detailed.module.scss";
import IDetailedMovieState from "./IDetailedMovieState";

/**
 * The detailed page displays meta information on a specific movie.
 * As well as the ability to watch a trailer.
 *
 * @return {*}  {JSX.Element}
 */
const Detailed = (): JSX.Element => {
  /* This gets the URL string after '?'*/
  const { search } = useLocation();
  const id = deconstructQuery(search);
  const [detailedMovieState, setDetailedMovieState] =
    useState<IDetailedMovieState>({
      detailedMovie: null,
      similarMovies: null,
    });

  /* This allows me to use a state across multiple components */
  const { isTrailerShowing, setIsTrailerShowing } = useTrailerContext();

  const clickHandler = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setIsTrailerShowing(!isTrailerShowing);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById("navbar")!.style.display = "flex";
    },
    [isTrailerShowing, setIsTrailerShowing]
  );

  useEffect(() => {
    void fetchDetailedMovie(id).then((response) => {
      setDetailedMovieState((prevState) => ({
        ...prevState,
        detailedMovie: response,
      }));
    });

    void fetchSimilarMovies(id).then((response) => {
      setDetailedMovieState((prevState) => ({
        ...prevState,
        similarMovies: response,
      }));
    });
  }, [id]);

  return (
    <div>
      {detailedMovieState.detailedMovie && (
        <>
          <HeroDetailed
            input={detailedMovieState.detailedMovie}
            id={detailedMovieState.detailedMovie.id}
          />
          {/* If the trailer is showing, display the close trailer button */}
          {isTrailerShowing ? (
            <button className={styles.ctaButton} onClick={clickHandler}>
              Close Trailer
            </button>
          ) : null}
          {/* For edge cases, when documentaries have no cast */}
          {detailedMovieState.detailedMovie.cast && (
            <CastCarousel cast={detailedMovieState.detailedMovie.cast} />
          )}
          {detailedMovieState.similarMovies && (
            <Carousel input={detailedMovieState.similarMovies} />
          )}
        </>
      )}
    </div>
  );
};

export default Detailed;
