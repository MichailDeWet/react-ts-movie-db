import React from "react";
import {
  ProgressiveImageProps,
  ProgressiveImageState,
} from "react-progressive-graceful-image";

interface IProgressiveImageProps extends ProgressiveImageProps {
  children: (src: string, loading: boolean) => JSX.Element;
}

export default class CustomProgressiveImage extends React.Component<
  IProgressiveImageProps,
  ProgressiveImageState
> {}
