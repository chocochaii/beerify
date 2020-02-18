import { Beer } from "../../models/Beer";

export interface BeerListInfinityScrollProps {
  mode: number;
  beers: Beer[];
  onLoadMore: any;
  loading: boolean;
  onToggleFavorite: any;
}
