import React, { useCallback, MouseEvent } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import IMovie from "@api/IMovie";
import styles from "./Movie.module.scss";
import ProgressiveImage from "react-progressive-graceful-image";

const LOW_RES_COVER_URL = process.env.REACT_APP_LOW_RES_COVER_URL as string;
const HIGH_RES_COVER_URL = process.env.REACT_APP_HIGH_RES_COVER_URL as string;

/**
 * The movie card is used by other components and is able to display a movie as a
 * poster, title and release year.
 *
 * @param {IMovieProps} movie
 * @return {*}  {JSX.Element}
 */
const Movie = (movie: IMovie): JSX.Element => {
  const navigate = useNavigate();

  /**
   * Returns a formatted Date as a string.
   *
   * @return {*}  {string}
   */
  function dateDeconstructor(): string {
    const year = movie.release_date.substring(0, 4);
    const month = movie.release_date.substring(5, 7);
    const day = movie.release_date.substring(8);

    const date = new Date(`${month}/${day}/${year}`);

    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  /* The handler is called when a movie card is clicked */
  const clickHandler = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const path = generatePath(`/detailed?=${movie.id}`);
      navigate(path, {
        state: {
          id: movie.id,
        },
      });
    },
    [movie.id, navigate]
  );

  return (
    <>
      <div className={styles.movieCard} onClick={clickHandler}>
        <ProgressiveImage
          src={
            movie.poster_path
              ? `${HIGH_RES_COVER_URL}${movie.poster_path}`
              : "https://i.ibb.co/bdpJTPs/not-found.png"
          }
          placeholder={
            movie.poster_path
              ? `${LOW_RES_COVER_URL}${movie.poster_path}`
              : "https://i.ibb.co/bdpJTPs/not-found.png"
          }
        >
          {(src: string, loading: boolean): JSX.Element => (
            <img
              className={
                loading
                  ? `${styles.moviePoster} ${styles.skeletonPoster}`
                  : styles.moviePoster
              }
              src={src}
              alt={movie.title}
            />
          )}
        </ProgressiveImage>
        <div className={styles.movieExtraDetails}>
          <h3>{movie.title}</h3>
          <br />
          <section>
            {/* Display release date */}
            Released: {movie.release_date ? dateDeconstructor() : "TBD"}
            <br />
            {/* Vote Count */}
            Upvotes: {movie.vote_count}
          </section>
          <br />
          <p className={styles.movieOverview}>{movie.overview}</p>
        </div>
      </div>
      <div className={styles.movieDetails}>
        <span className={styles.movieTitle}>{movie.title}</span>
        {/* Only print the year */}
        <span className={styles.movieDate}>
          {movie.release_date ? movie.release_date.substring(0, 4) : "TBD"}
        </span>
      </div>
    </>
  );
};

export default Movie;
