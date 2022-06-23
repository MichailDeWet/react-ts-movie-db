import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ICategorizedMovie from "@api/ICategorizedMovie";
import { fetchSearchMovies } from "@api/movie";
import List from "@components/List/List";
import styles from "./Search.module.scss";

/**
 * When parsed the current URL search query, this will return a neatly formatted query.
 *
 * @param {string} query
 * @return {*} {string}
 */
export const deconstructQuery = (query: string): string =>
  decodeURIComponent(query).substring(2);

/**
 * This page displays all movies returned by the API, given the search query.
 *
 * @return {*}  {JSX.Element}
 */
const Search = (): JSX.Element => {
  /* This gets the URL string after '?'*/
  const { search } = useLocation();
  const searchKey = deconstructQuery(search);

  /* The state holds a list of movies returned with the 'searchKey'. */
  const [searchMovies, setSearchMovies] = useState<ICategorizedMovie | null>(
    null
  );

  useEffect(() => {
    void fetchSearchMovies(searchKey).then((response) => {
      setSearchMovies(response);
    });
  }, [searchKey]);

  return (
    <>
      <div className={styles.searchPageHeader}>
        <h1>Search Results</h1>
        <p>Showing results for: {searchKey}</p>
      </div>
      {searchMovies && (
        <List category={searchMovies.category} movies={searchMovies.movies} />
      )}
    </>
  );
};

export default Search;
