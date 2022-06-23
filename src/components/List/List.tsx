import React, { useMemo } from "react";
import ICategorizedMovie from "@api/ICategorizedMovie";
import Movie from "@components/Movie/Movie";
import styles from "./List.module.scss";

/**
 * This component will display movies in a grid like fashion.
 *
 * @param {ICategorizedMovie} input
 * @return {*}  {JSX.Element}
 */
const List = (input: ICategorizedMovie): JSX.Element => {
  /* This allows me to cache a list of movies so that there are no unnecessary rerenders */
  const memo: JSX.Element = useMemo(() => {
    return (
      <section>
        <ul className={styles.list}>
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

export default List;
