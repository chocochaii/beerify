import { gql } from "apollo-boost";

export default gql`
  query getCountries {
    allCountries {
      id
      name
    }
  }
`;
