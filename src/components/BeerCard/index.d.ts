import { Style } from "../../models/Style";
import { Country } from "../../models/Country";

export interface BeerCardProps {
  mode: number;
  id: string;
  img: string;
  title: string;
  style: Style;
  country: Country;
  isFavorite: boolean;
  refetchFavoriteBeerFn: any;
  onCreateFavoriteBeer: any;
  onUpdateFavoriteBeer: any;
}
