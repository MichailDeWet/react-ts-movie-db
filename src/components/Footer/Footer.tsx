import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styles from "./Footer.module.scss";

/**
 * The footer component is consistent throughout all pages on small windows/devices.
 * It contains a search feature.
 *
 * @return {*}  {JSX.Element}
 */
const Footer = (): JSX.Element => {
  const [searchKey, setSearchKey] = useState<string>("");

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

  return (
    <>
      <nav className={styles.footer}>
        <form className={styles.footerForm} onSubmit={submitHandler}>
          <input
            className={styles.searchFooterForm}
            type="search"
            placeholder="Search Movie"
            value={searchKey}
            onChange={changeHandler}
            required
          />
          <button className={styles.footerButton} type="submit"></button>
        </form>
      </nav>
      {/* This tag allows the Nav component to have children components */}
      <Outlet />
    </>
  );
};

export default Footer;
