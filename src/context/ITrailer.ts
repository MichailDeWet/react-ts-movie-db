import { Dispatch } from "react";

/**
 * Gives trailer a state and a function which will set state .
 *
 * @export
 * @interface ITrailer
 */
export default interface ITrailer {
  isTrailerShowing: boolean;
  setIsTrailerShowing: Dispatch<React.SetStateAction<boolean>>;
}
