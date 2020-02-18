import * as React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import fetchBeers from "../queries/fetchBeers";
import fetchFavoriteBeers from "../queries/fetchFavoriteBeers";
import fetchStyles from "../queries/fetchStyles";
import { BeerFilter, FavoriteBeer, Beer } from "../models/Beer";
import { AppBreadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { AppSelect } from "../components/Select/Select";
import BeerListInfinityScroll from "../components/BeerListInfinityScroll/BeerListInfinityScroll";
import fetchCountries from "../queries/fetchCountries";
import { Col, notification, Button } from "antd";
import { FilterRow } from "../style";
import { SeletOptionProps } from "../components/Select";
import { ALL_BEERS_MODE, FAVORITE_BEERS_MODE } from "../constants/Types.json";
import BeerIcon from "../components/BeerIcon/BeerIcon";
import fetchFavoriteBeersCount from "../queries/fetchFavoriteBeersCount";

const BeerList: React.FC<any> = props => {
  const {
    match: { params: { country_id = "", style_id = "" } = {}, path = "" } = {},
    history,
    breadcrumbs
  } = props;

  let mode = ALL_BEERS_MODE;
  let fetchQuery = fetchBeers;

  if (path.includes("favorite")) {
    mode = FAVORITE_BEERS_MODE;
    fetchQuery = fetchFavoriteBeers;
  }

  let filter: BeerFilter = {};
  let meta: any = {
    page: 0,
    perPage: mode === ALL_BEERS_MODE ? 18 : null,
    sortField: "id"
  };

  const defaultStyle: SeletOptionProps = { id: "", name: "All styles" };
  const defaultCountry: SeletOptionProps = { id: "", name: "All countries" };
  let selectedStyle: SeletOptionProps = defaultStyle;
  let selectedCountry: SeletOptionProps = defaultCountry;

  let refetchFn: any = null;
  let completeResult: boolean = false;

  let prevNotificationKey: string = "";

  if (country_id) {
    filter.country_id = country_id;
  }

  if (style_id) {
    filter.style_id = style_id;
  }

  const breadcrumbKeys = {
    style: style_id,
    country: country_id
  };

  const onFetchMore = (meta: any, fetchMore: any) => {
    const page = ++meta.page;
    const perPage = meta.perPage;
    const sortField = meta.sortField;

    let query: any = gql`
      query getAllBeers {
        allBeers(
          filter: {${Object.keys(filter)
            .map(key => `${key}: ${(filter as any)[key]}`)
            .join(" ")}}
          page: ${page}
          perPage: ${perPage}
          sortField: "${sortField}"
        ) {
          id
          title
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

    fetchMore({
      query,
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        const { allBeers: prevBeers } = prev;
        const { allBeers: moreBeers } = fetchMoreResult;

        if (moreBeers && !moreBeers.length) {
          completeResult = true;
          return { allBeers: [...prevBeers] };
        }
        return Object.assign({}, prev, {
          allBeers: [...prevBeers, ...moreBeers]
        });
      }
    });
  };

  const onFilterChanged = (value: string, filterKey: string) => {
    if (refetchFn) {
      completeResult = false;
      if (value) {
        (filter as any)[filterKey] = value;
      } else {
        delete (filter as any)[filterKey];
      }
      meta = {
        page: 0,
        perPage: 18
      };
      refetchFn();
    }
  };

  const onToggleFavorite = (numOfFavorites: number) => {
    if (mode === ALL_BEERS_MODE) {
      const key = `notification-${Date.now()}`;
      if (prevNotificationKey) {
        notification.close(prevNotificationKey);
      }
      prevNotificationKey = key;
      notification.open({
        key,
        message: numOfFavorites
          ? "Favorite beers updated!"
          : "No favorite beers :(",
        description: numOfFavorites ? (
          `You have ${numOfFavorites} favorite beer${
            numOfFavorites > 1 ? "s" : ""
          }`
        ) : (
          <div>
            Click on{" "}
            <span role="img" aria-label="Beer">
              🍺
            </span>{" "}
            to save your favorite ones!
          </div>
        ),
        duration: numOfFavorites ? 0 : 3,
        closeIcon: null,
        icon: <BeerIcon filled={true} />,
        btn: (
          <Button
            onClick={() => {
              notification.close(key);
              if (numOfFavorites) {
                history.push("/favorite");
              }
            }}
          >
            {numOfFavorites ? "Go to favorite!" : "Close"}
          </Button>
        ),
        onClose: () => {
          prevNotificationKey = "";
        }
      });
    }
  };

  return (
    <div>
      <AppBreadcrumb items={breadcrumbs} keys={breadcrumbKeys} />
      {mode === ALL_BEERS_MODE && (
        <FilterRow gutter={{ xs: 8, sm: 16 }} type="flex" align="middle">
          <Col xs={12} md={6} xl={4}>
            <Query query={fetchStyles}>
              {({ loading, data }: any) => {
                if (loading) {
                  return null;
                }
                if (style_id) {
                  selectedStyle = data.allStyles.find(
                    (style: any) => style.id === style_id
                  );
                }
                return (
                  <AppSelect
                    filterKey="style_id"
                    placeholder="Style Filter"
                    options={loading ? [] : data.allStyles}
                    disabled={loading}
                    selectedValue={selectedStyle}
                    defaultValue={defaultStyle}
                    onSelectChanged={onFilterChanged}
                  />
                );
              }}
            </Query>
          </Col>
          <Col xs={12} md={6} xl={4}>
            <Query query={fetchCountries}>
              {({ loading, data }: any) => {
                if (loading) {
                  return null;
                }
                if (country_id) {
                  selectedCountry = data.allCountries.find(
                    (country: any) => country.id === country_id
                  );
                }
                return (
                  <AppSelect
                    filterKey="country_id"
                    placeholder="Country Filter"
                    options={loading ? [] : data.allCountries}
                    disabled={loading}
                    selectedValue={selectedCountry}
                    defaultValue={defaultCountry}
                    onSelectChanged={onFilterChanged}
                  />
                );
              }}
            </Query>
          </Col>
        </FilterRow>
      )}
      <Query
        query={fetchQuery}
        variables={{ filter, ...meta }}
        fetchPolicy={"network-only"}
        notifyOnNetworkStatusChange={true}
      >
        {({ loading, error, data, fetchMore, refetch }: any) => {
          if (error) return <div>Error :(</div>;
          if (!refetchFn) {
            refetchFn = refetch;
          }
          const beers =
            mode === ALL_BEERS_MODE
              ? data
                ? data.allBeers
                : []
              : data
              ? data.allFavoriteBeers
                  .map((item: FavoriteBeer) => item.Beer)
                  .filter((beer: Beer) => beer !== null)
              : [];
          return (
            <Query
              query={fetchFavoriteBeersCount}
              skip={mode === FAVORITE_BEERS_MODE}
            >
              {({ refetch: refetchFavoriteCount }: any) => (
                <BeerListInfinityScroll
                  mode={mode}
                  beers={beers}
                  onLoadMore={() => {
                    if (mode === ALL_BEERS_MODE && !completeResult) {
                      onFetchMore(meta, fetchMore);
                    }
                  }}
                  loading={loading}
                  onToggleFavorite={() => {
                    refetchFavoriteCount().then(
                      ({ data: { allFavoriteBeers = [] } }: any) => {
                        onToggleFavorite(
                          allFavoriteBeers.filter(
                            ({ Beer }: FavoriteBeer) => Beer !== null
                          ).length
                        );
                      }
                    );
                  }}
                />
              )}
            </Query>
          );
        }}
      </Query>
    </div>
  );
};

export default BeerList;
