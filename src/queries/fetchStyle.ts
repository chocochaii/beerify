import { gql } from "apollo-boost";

export default gql`
  query getStyle($id: ID!) {
    Style(id: $id) {
      id
      name
    }
  }
`;
