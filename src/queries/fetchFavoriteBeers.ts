import { gql } from "apollo-boost";

export default gql`
  query getAllFavoriteBeers(
    $filter: FavoriteBeerFilter
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
  ) {
    allFavoriteBeers(
      filter: $filter
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
    ) {
      Beer {
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
  }
`;
