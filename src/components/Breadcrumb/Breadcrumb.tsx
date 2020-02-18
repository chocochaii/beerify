import React from "react";
import { Breadcrumb, BreadcrumbItem } from "./style";
import {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbKeysProps
} from "./index.d";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import fetchStyle from "../../queries/fetchStyle";
import fetchCountry from "../../queries/fetchCountry";

export const AppBreadcrumb: React.FC<BreadcrumbProps> = props => {
  let { items, keys } = props;

  const { style: styleId, country: countryId, title } = keys;

  const breadcrumbNameMapping = (
    items: BreadcrumbItemProps[],
    names: BreadcrumbKeysProps
  ) => {
    return items.map(item => {
      Object.keys(names).forEach(key => {
        item.name = item.name.replace(`{{${key}}}`, (names as any)[key]);
      });
      return { ...item };
    });
  };

  return (
    <Query query={fetchStyle} variables={{ id: styleId }} skip={!styleId}>
      {({
        loading: styleLoading,
        error: styleError,
        data: { Style: { name: styleName = "" } = {} } = {}
      }: any) => (
        <Query
          query={fetchCountry}
          variables={{ id: countryId }}
          skip={!countryId}
        >
          {({
            loading: countryLoading,
            error: countryError,
            data: { Country: { name: countryName = "" } = {} } = {}
          }: any) => {
            if (styleLoading || countryLoading) return <p>Loading...</p>;
            if (styleError || countryError) return <p>Error :(</p>;
            const names: BreadcrumbKeysProps = {};
            if (styleName) {
              names.style = styleName;
            }
            if (countryName) {
              names.country = countryName;
            }
            if (title) {
              names.title = title;
            }
            items = breadcrumbNameMapping(items, names);
            return (
              <Breadcrumb>
                {items.map(({ path, name }: BreadcrumbItemProps) => (
                  <BreadcrumbItem key={name}>
                    <Link to={path}>{name}</Link>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            );
          }}
        </Query>
      )}
    </Query>
  );
};
