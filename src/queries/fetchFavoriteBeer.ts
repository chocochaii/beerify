import { gql } from "apollo-boost";

export default gql`
  query getFavoriteBeer($id: ID!) {
    FavoriteBeer(id: $id) {
      Beer {
        id
      }
    }
  }
`;
