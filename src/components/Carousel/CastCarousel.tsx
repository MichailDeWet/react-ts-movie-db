import React, { useMemo } from "react";
import MovieCast from "@components/Movie/MovieCast";
import styles from "./Carousel.module.scss";
import ICastProps from "./ICastProps";

/**
 * This component displays a list of cast members in a horizontal fashion.
 *
 * @param {ICastProps} { cast }
 * @return {*}  {JSX.Element}
 */
const CastCarousel = ({ cast }: ICastProps): JSX.Element => {
  /* This allows me to cache a list of movies so that there are no unnecessary rerenders */
  const memo: JSX.Element = useMemo(() => {
    return (
      <section>
        <h3 className={styles.categoryHeading}>Cast</h3>
        <ul className={`${styles.carousel} ${styles.carouselCast}`}>
          {Object.values(cast).map((c) => (
            <li key={c.id}>
              <MovieCast
                key={c.id}
                character={c.character}
                id={c.id}
                name={c.name}
                profile_path={c.profile_path}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }, [cast]);

  return memo;
};

export default CastCarousel;
