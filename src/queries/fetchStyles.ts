import { gql } from "apollo-boost";

export default gql`
  query getStyles {
    allStyles {
      id
      name
    }
  }
`;
