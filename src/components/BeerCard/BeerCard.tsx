import * as React from "react";
import { BeerCardProps } from "./index.d";
import { Link } from "react-router-dom";
import { BeerCard as StyledBeerCard } from "./style";
import { ALL_BEERS_MODE } from "../../constants/Types.json";
import BeerIcon from "../BeerIcon/BeerIcon";

const { Meta } = StyledBeerCard;

const BeerCard: React.FC<BeerCardProps> = props => {
  const {
    mode,
    id,
    img,
    title,
    style: { id: styleId, name: styleName },
    country: { id: countryId, name: countryName },
    isFavorite,
    refetchFavoriteBeerFn,
    onCreateFavoriteBeer,
    onUpdateFavoriteBeer
  } = props;

  return (
    <Link
      to={
        mode === ALL_BEERS_MODE
          ? `/style/${styleId}/country/${countryId}/beer/${id}`
          : `/favorite/${id}`
      }
    >
      <StyledBeerCard hoverable cover={<img src={img} alt={title} />}>
        <BeerIcon
          filled={isFavorite}
          onClick={(e: any) => {
            e.preventDefault();
            refetchFavoriteBeerFn().then(
              ({ data: { FavoriteBeer = null } = {} }: any) => {
                if (!FavoriteBeer) {
                  onCreateFavoriteBeer();
                } else {
                  onUpdateFavoriteBeer();
                }
              }
            );
          }}
        />
        <Meta
          title={title}
          description={
            <div>
              {styleName} / {countryName}
            </div>
          }
        />
      </StyledBeerCard>
    </Link>
  );
};

export default BeerCard;
