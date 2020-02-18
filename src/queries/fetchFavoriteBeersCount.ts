import { gql } from "apollo-boost";

export default gql`
  query getAllFavoriteBeersCount {
    allFavoriteBeers {
      Beer {
        id
      }
    }
  }
`;
