import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ICategorizedMovie from "@api/ICategorizedMovie";
import IMovie from "@api/IMovie";
import styles from "./Hero.module.scss";

/* Link to cover image */
const HIGH_RES_COVER_URL = process.env.REACT_APP_HIGH_RES_COVER_URL as string;

/**
 * The Hero component is the first component beneath the navbar on the home page.
 *
 * @param {ICategorizedMovie} input
 * @return {*}  {JSX.Element}
 */
const Hero = (input: ICategorizedMovie): JSX.Element => {
  let index = 0;
  const [movie, setMovie] = useState<IMovie>(input.movies[index]);

  /* Change hero every 5 seconds */
  useEffect(() => {
    setInterval(() => {
      index = index === input.movies.length - 1 ? 0 : index + 1;
      setMovie(input.movies[index]);
    }, 5000);
  }, []);

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `url(${HIGH_RES_COVER_URL}${movie.backdrop_path})`,
      }}
    >
      <div>
        <h1 className={styles.heroTitle}>{`${movie.title}`}</h1>
        <Link to={`/detailed?=${movie.id}`} className={styles.ctaButton}>
          Details
        </Link>
        <p className={styles.heroOverview}>{movie.overview}</p>
      </div>
    </section>
  );
};

export default Hero;
