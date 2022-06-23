import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import styles from "./Nav.module.scss";
import debounce from "lodash.debounce";

/**
 * The navbar component is consistent throughout all pages.
 * It contains a link to the home page and a search feature.
 *
 * @return {*}  {JSX.Element}
 */
const Nav = (): JSX.Element => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [navbar, setNavbar] = useState<boolean>(false);

  /* Change navbar opacity based on scroll location */
  const navbarOpacity = (): void => {
    window.scrollY >= 40 ? setNavbar(true) : setNavbar(false);
    const scrollTop = window.scrollY;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("navbar")!.style.background =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      `rgb(15, 15, 15, ${scrollTop}%)`!;
  };

  /* Call navbarOpacity on scroll */
  window.addEventListener("scroll", navbarOpacity);

  /* This allows you to navigate to a URL path */
  const navigate = useNavigate();

  /* The handler is called when the search field is submitted, it generates a URL path and navigates to the search page */
  const submitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      /* This stops the page from reloading */
      event.preventDefault();
      const path = generatePath(`/search?=${searchKey}`);
      navigate(path);
      setSearchKey("");
    },
    [searchKey, navigate]
  );

  /* The handler is called when the search field is updated */
  const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  }, []);

  // const debouncedChangeHandler = useMemo(
  //   () => debounce(changeHandler, 300),
  //   []
  // );

  /* Stop the invocation of the debounced function after unmounting */
  // useEffect(() => {
  //   return () => {
  //     debouncedChangeHandler.cancel();
  //   };
  // }, []);

  return (
    <>
      <nav
        className={navbar ? `${styles.navbar} ${styles.active}` : styles.navbar}
        id="navbar"
      >
        <div>
          {/* This makes the text clickable and points to the homepage */}
          <Link to="/" className={styles.logo}>
            Movie<span className={styles.logoSpan}>DB</span>
          </Link>
        </div>

        <form onSubmit={submitHandler}>
          <input
            className={styles.searchForm}
            type="search"
            placeholder="Search Movie"
            value={searchKey}
            onChange={changeHandler}
            required
          />
          <button className={styles.navButton} type="submit"></button>
        </form>
      </nav>
      {/* This tag allows the Nav component to have children components */}
      <Outlet />
    </>
  );
};

export default Nav;
