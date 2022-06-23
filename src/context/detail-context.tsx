import React, { createContext, useContext, useState } from "react";
import ITrailer from "./ITrailer";
import ITrailerProviderProps from "./ITrailerProviderProps";

/* This is a default state. */
const initialState: ITrailer = {
  isTrailerShowing: false,
  setIsTrailerShowing: () => {},
};

/* Giving the context an initial/default state */
export const TrailerContext = createContext<ITrailer>(initialState);

/* Custom hook gives me the ability to use the trailer state in various components */
export const useTrailerContext = (): ITrailer =>
  useContext<ITrailer>(TrailerContext);

/* Any child component that is wrapped by this provider will have access to the trailer state */
export const TrailerProvider = ({
  children,
}: ITrailerProviderProps): JSX.Element => {
  const [isTrailerShowing, setIsTrailerShowing] = useState<boolean>(false);
  /* An object which contains the state and dispatch function */
  const state = { isTrailerShowing, setIsTrailerShowing };

  return (
    <TrailerContext.Provider value={state}>{children}</TrailerContext.Provider>
  );
};

export default TrailerProvider;
