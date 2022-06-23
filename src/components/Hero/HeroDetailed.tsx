import React, { useCallback, MouseEvent } from "react";
import YouTube from "react-youtube";
import { useTrailerContext } from "@context/detail-context";
import styles from "./Hero.module.scss";
import IHeroDetailedProps from "./IHeroDetailedProps";
import ProgressiveImage from "react-progressive-graceful-image";

/* Link to cover image */
const HIGH_RES_COVER_URL = process.env.REACT_APP_HIGH_RES_COVER_URL as string;
const LOW_RES_COVER_URL = process.env.REACT_APP_LOW_RES_COVER_URL as string;

/**
 * The Hero component is the first component beneath the navbar on the detailed page.
 *
 * @param {IHeroDetailedProps} { input, id }
 * @return {*}  {JSX.Element}
 */
const HeroDetailed = ({ input, id }: IHeroDetailedProps): JSX.Element => {
  /**
   * Returns the index of the director in the crew array.
   *
   * @return {*}  {number}
   */
  function findIndex(): number {
    return input.crew.findIndex((c) => c.job === "Director");
  }

  /**
   * Converts min to hours and mins.
   *
   * @return {*}  {string}
   */
  function minToHours(): string {
    return `${Math.floor(input.runtime / 60)}h ${input.runtime % 60}m`;
  }

  /**
   * Returns a formatted Date as a string.
   *
   * @return {*}  {string}
   */
  function dateDeconstructor(): string {
    const year = input.release_date.substring(0, 4);
    const month = input.release_date.substring(5, 7);
    const day = input.release_date.substring(8);

    const date = new Date(`${month}/${day}/${year}`);

    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  /* State holds (boolean) information regarding the trailer. */
  const { isTrailerShowing, setIsTrailerShowing } = useTrailerContext();

  /* This will toggle the trailer */
  const clickHandler = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setIsTrailerShowing(!isTrailerShowing);
    },
    [isTrailerShowing, setIsTrailerShowing]
  );

  /**
   * This element makes a YouTube trailer visible, finds the official trailer,
   * or next best, and plays the video.
   *
   * @return {*}  {JSX.Element}
   */
  const playMedia = (): JSX.Element => {
    const trailer = input.videos.results.find(
      (v) => v.official && v.site === "YouTube"
    );

    /* If an official trailer does not exist, use the next best video. */
    const key = trailer ? trailer.key : input.videos.results[0].key;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("navbar")!.style.display = "none";

    return (
      <YouTube
        videoId={key}
        className={styles.youtubeTrailer}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: true,
            /* Hides the timeline */
            controls: 0,
          },
        }}
      />
    );
  };

  return (
    <section
      id="hero"
      className={styles.hero}
      style={{
        backgroundImage: `url(${HIGH_RES_COVER_URL}${input.backdrop_path})`,
      }}
    >
      <ProgressiveImage
        src={
          input.poster_path
            ? `${HIGH_RES_COVER_URL}${input.poster_path}`
            : "https://i.ibb.co/bdpJTPs/not-found.png"
        }
        placeholder={
          input.poster_path
            ? `${LOW_RES_COVER_URL}${input.poster_path}`
            : "https://i.ibb.co/bdpJTPs/not-found.png"
        }
      >
        {(src: string, loading: boolean): JSX.Element => (
          <img
            className={styles.heroPosterCover}
            style={{ opacity: loading ? 0.5 : 1 }}
            src={src}
            alt={input.title}
          />
        )}
      </ProgressiveImage>
      {input.videos && isTrailerShowing ? playMedia() : null}
      <div>
        <h1>{`${input.title}`}</h1>
        <p>
          {/* Display the Director */}
          Directed by <strong>{input.crew[findIndex()].name}</strong>
          <br />
          {/* Display time */}
          {minToHours()} <br />
          {/* Display release date */}
          {input.release_date ? dateDeconstructor() : "TBD"}
        </p>
        {/* Display genres */}
        <ul className={styles.genre}>
          {input.genres.map((g, i) =>
            input.genres[i + 1] ? (
              <li key={g.id}>
                {g.name} <strong> | </strong>
              </li>
            ) : (
              g.name
            )
          )}
        </ul>
        <button className={styles.ctaButton} onClick={clickHandler}>
          Play Trailer
        </button>
        <p className={styles.heroOverview}>{input.overview}</p>
      </div>
    </section>
  );
};

export default HeroDetailed;
