import { gql } from "apollo-boost";

export default gql`
  mutation updateFavoriteBeer($id: ID!, $beer_id: ID!) {
    updateFavoriteBeer(id: $id, beer_id: $beer_id) {
      id
      beer_id
    }
  }
`;
