import React from "react";
import { Icon } from "antd";
import { BeerIconProps } from "./index.d";
import { ReactComponent as BeerFilledSvg } from "../../assets/svg/beer_filled.svg";
import { ReactComponent as BeerEmptySvg } from "../../assets/svg/beer_empty.svg";

const BeerIcon: React.FC<BeerIconProps> = props => {
  const {
    filled,
    onClick = () => {
      return false;
    }
  } = props;

  return (
    <Icon
      component={filled ? BeerFilledSvg : BeerEmptySvg}
      onClick={e => onClick(e)}
    />
  );
};

export default BeerIcon;
