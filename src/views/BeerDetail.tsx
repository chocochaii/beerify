import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import fetchBeer from "../queries/fetchBeer";
import { AppBreadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { Row, Col, Tag } from "antd";
import { BeerDetailWrapper, TagWrapper } from "../style";
import { ThemeContext } from "styled-components";

const BeerDetail: React.FC<any> = props => {
  const {
    match: { params: { beer_id: id = "" } = {} } = {},
    breadcrumbs
  }: any = props;

  const theme = React.useContext(ThemeContext);

  return (
    <Query query={fetchBeer} variables={{ id }}>
      {({ loading, error, data }: any) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        const {
          title,
          description,
          image_path,
          Style: { id: styleId, name: styleName },
          Country: { id: countryId, name: countryName }
        }: any = data.Beer;

        const breadcrubmKeys = {
          style: styleId,
          country: countryId,
          title
        };

        return (
          <div>
            <AppBreadcrumb items={breadcrumbs} keys={breadcrubmKeys} />
            <Row
              gutter={[
                { xs: 8, sm: 16 },
                { xs: 8, sm: 16 }
              ]}
              type="flex"
            >
              <Col xs={24} md={10} xl={{ span: 8, offset: 2 }}>
                <img
                  src={image_path}
                  alt={title}
                  style={{ width: "100%", height: "auto" }}
                />
              </Col>
              <Col xs={24} md={14} xl={{ span: 10, offset: 2 }}>
                <BeerDetailWrapper>
                  <h1>{`${title}`}</h1>
                  <div>
                    <strong>Style:</strong> {styleName}
                  </div>
                  <div>
                    <strong>Country:</strong> {countryName}
                  </div>
                  <p>{description}</p>
                  <TagWrapper>
                    <strong>Tags:</strong>
                    <Tag color={theme.primaryShade}>
                      <Link to={`/style/${styleId}`}>{styleName}</Link>
                    </Tag>
                    <Tag color={theme.primaryShade}>
                      <Link to={`/country/${countryId}`}>{countryName}</Link>
                    </Tag>
                  </TagWrapper>
                </BeerDetailWrapper>
              </Col>
            </Row>
          </div>
        );
      }}
    </Query>
  );
};

export default BeerDetail;
