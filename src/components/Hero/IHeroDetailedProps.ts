import IDetailedMovie from "@api/IDetailedMovie";

/**
 * Hero on detailed page requires these props.
 *
 * @export
 * @interface IHeroDetailedProps
 */
export default interface IHeroDetailedProps {
  id: number;
  input: IDetailedMovie;
}
