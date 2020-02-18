import { Style } from "./Style";
import { Country } from "./Country";

export interface Beer {
  id: string;
  title: string;
  description: string;
  image_path: string;
  Style: Style;
  Country: Country;
  FavoriteBeers: FavoriteBeer[];
}

export interface FavoriteBeer {
  Beer: Beer;
}

export interface BeerFilter {
  q?: string;
  ids?: string[];
  id?: string;
  title?: string;
  description?: string;
  style_id?: string;
  country_id?: string;
  image_path?: string;
}
