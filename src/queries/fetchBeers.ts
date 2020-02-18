import { gql } from "apollo-boost";

export default gql`
  query getAllBeers(
    $filter: BeerFilter
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
  ) {
    allBeers(
      filter: $filter
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
    ) {
      id
      title
      image_path
      Style {
        id
        name
      }
      Country {
        id
        name
      }
      FavoriteBeers {
        id
      }
    }
  }
`;
