import React from "react";
import { Footer } from "./style";

export const AppFooter: React.FC = () => {
  return (
    <Footer>
      <span role="img" aria-label="Beer">
        🍺
      </span>
      <span style={{ marginLeft: 8, marginRight: 8 }}>
        Beerify ©2020 Created by Chocochaii
      </span>
      <span role="img" aria-label="Chocolate bar">
        🍫
      </span>
    </Footer>
  );
};
