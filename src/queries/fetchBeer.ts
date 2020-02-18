import { gql } from "apollo-boost";

export default gql`
  query getBeer($id: ID!) {
    Beer(id: $id) {
      id
      title
      description
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
