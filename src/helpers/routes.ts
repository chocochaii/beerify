import BeerList from "../views/BeerList";
import BeerDetail from "../views/BeerDetail";

export const routes = [
  { path: "/", name: "All beers", Component: BeerList },
  { path: "/favorite", name: "Favorite beers", Component: BeerList },
  { path: "/favorite/:beer_id", name: "{{title}}", Component: BeerDetail },
  { path: "/style/:style_id", name: "{{style}}", Component: BeerList },
  { path: "/country/:country_id", name: "{{country}}", Component: BeerList },
  {
    path: "/style/:style_id/country/:country_id",
    name: "",
    Component: BeerList
  },
  {
    path: "/style/:style_id/country/:country_id/beer/:beer_id",
    name: "{{title}}",
    Component: BeerDetail
  }
];
