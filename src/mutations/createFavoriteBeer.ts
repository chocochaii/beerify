import { gql } from "apollo-boost";

export default gql`
  mutation createFavoriteBeer($id: ID!, $beer_id: ID!) {
    createFavoriteBeer(id: $id, beer_id: $beer_id) {
      id
      beer_id
    }
  }
`;
