import React from "react";
import ICastMember from "@api/ICastMember";
import styles from "./Movie.module.scss";
import ProgressiveImage from "react-progressive-graceful-image";

const HIGH_RES_COVER_URL = process.env.REACT_APP_HIGH_RES_COVER_URL as string;
const LOW_RES_COVER_URL = process.env.REACT_APP_LOW_RES_COVER_URL as string;

const MovieCast = (input: ICastMember): JSX.Element => {
  return (
    <div>
      <ProgressiveImage
        src={
          input.profile_path
            ? `${HIGH_RES_COVER_URL}${input.profile_path}`
            : "https://i.ibb.co/bdpJTPs/not-found.png"
        }
        placeholder={
          input.profile_path
            ? `${LOW_RES_COVER_URL}${input.profile_path}`
            : "https://i.ibb.co/bdpJTPs/not-found.png"
        }
      >
        {(src: string, loading: boolean): JSX.Element => (
          <img
            className={
              loading
                ? `${styles.castPoster} ${styles.cast} ${styles.skeletonCast}`
                : `${styles.castPoster} ${styles.cast}`
            }
            src={src}
            alt={input.name}
          />
        )}
      </ProgressiveImage>
      {/* Display character and actor */}
      <div className={styles.castDetails}>
        {input.character}
        <span className={styles.metaDetails}> by {input.name}</span>
      </div>
    </div>
  );
};

export default MovieCast;
