import React from "react";
import BeerCard from "../BeerCard/BeerCard";
import { Beer } from "../../models/Beer";
import { Row, Col, Spin } from "antd";
import { BeerListInfinityScrollWrapper } from "./style";
import { BeerListInfinityScrollProps } from "./index.d";
import { SpinWrapper } from "../../style";
import { Query, Mutation } from "react-apollo";
import fetchBeer from "../../queries/fetchBeer";
import mutationCreateFavoriteBeer from "../../mutations/createFavoriteBeer";
import mutationUpdateFavoriteBeer from "../../mutations/updateFavoriteBeer";
import fetchFavoriteBeer from "../../queries/fetchFavoriteBeer";

const handleScroll = ({ currentTarget }: any, onLoadMore: any) => {
  if (
    currentTarget.scrollTop + currentTarget.clientHeight >=
    currentTarget.scrollHeight
  ) {
    onLoadMore();
  }
};

const BeerListInfinityScroll: React.FC<BeerListInfinityScrollProps> = ({
  mode,
  beers,
  onLoadMore,
  loading,
  onToggleFavorite
}) => (
  <BeerListInfinityScrollWrapper onScroll={e => handleScroll(e, onLoadMore)}>
    <Row
      gutter={[
        { xs: 8, sm: 16, xl: 24 },
        { xs: 8, sm: 16, xl: 24 }
      ]}
      type="flex"
    >
      {beers.map(
        ({ id, title, image_path, Style, Country, FavoriteBeers }: Beer) => (
          <Col xs={12} sm={12} md={12} lg={6} xl={4} key={id}>
            <Mutation
              key={"create-favorite-beer"}
              mutation={mutationCreateFavoriteBeer}
              refetchQueries={[
                {
                  query: fetchBeer,
                  variables: { id }
                }
              ]}
            >
              {(createFavoriteBeer: any) => {
                return (
                  <Mutation
                    key={"update-favorite-beer"}
                    mutation={mutationUpdateFavoriteBeer}
                    refetchQueries={[
                      {
                        query: fetchBeer,
                        variables: { id }
                      }
                    ]}
                  >
                    {(updateFavoriteBeer: any) => {
                      return (
                        <Query query={fetchFavoriteBeer} variables={{ id }}>
                          {({ refetch: refetchFavoriteBeer }: any) => {
                            const isFavorite = !!FavoriteBeers.length;
                            return (
                              <BeerCard
                                mode={mode}
                                id={id}
                                title={title}
                                img={image_path}
                                style={Style}
                                country={Country}
                                isFavorite={isFavorite}
                                refetchFavoriteBeerFn={refetchFavoriteBeer}
                                onCreateFavoriteBeer={() => {
                                  createFavoriteBeer({
                                    variables: {
                                      id,
                                      beer_id: id
                                    }
                                  }).then(() => {
                                    onToggleFavorite();
                                  });
                                }}
                                onUpdateFavoriteBeer={() => {
                                  updateFavoriteBeer({
                                    variables: {
                                      id,
                                      beer_id: isFavorite ? `-${id}` : id
                                    }
                                  }).then(() => {
                                    onToggleFavorite();
                                  });
                                }}
                              />
                            );
                          }}
                        </Query>
                      );
                    }}
                  </Mutation>
                );
              }}
            </Mutation>
          </Col>
        )
      )}
    </Row>
    {loading && (
      <SpinWrapper>
        <Spin />
      </SpinWrapper>
    )}
  </BeerListInfinityScrollWrapper>
);

export default BeerListInfinityScroll;
