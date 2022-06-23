import React, { useMemo } from "react";
import Movie from "@components/Movie/Movie";
import styles from "./Carousel.module.scss";
import ICarouselProps from "./ICarouselProps";

/**
 * This component displays a list of movies in a horizontal fashion.
 *
 * @param {ICarouselProps} { input }
 * @return {*}  {JSX.Element}
 */
const Carousel = ({ input }: ICarouselProps): JSX.Element => {
  /* This allows me to cache a list of movies so that there are no unnecessary rerenders */
  const memo: JSX.Element = useMemo(() => {
    return (
      <section>
        <h3 className={styles.categoryHeading}>{`${input.category} Movies`}</h3>
        <ul className={styles.carousel}>
          {input.movies.map((m) => (
            <li key={m.id}>
              <Movie
                backdrop_path={m.backdrop_path}
                id={m.id}
                overview={m.overview}
                poster_path={m.poster_path}
                release_date={m.release_date}
                runtime={m.runtime}
                title={m.title}
                vote_count={m.vote_count}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }, [input]);

  return memo;
};

export default Carousel;
