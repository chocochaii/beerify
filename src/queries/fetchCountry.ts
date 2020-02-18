import { gql } from "apollo-boost";

export default gql`
  query getCountry($id: ID!) {
    Country(id: $id) {
      id
      name
    }
  }
`;
