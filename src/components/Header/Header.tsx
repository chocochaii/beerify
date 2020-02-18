import React from "react";
import { Header } from "./style";

export const AppHeader: React.FC = () => {
  return (
    <Header>
      <a href="/">
        <span role="img" aria-label="Beer">
          🍺
        </span>{" "}
        Beerify
      </a>
    </Header>
  );
};
