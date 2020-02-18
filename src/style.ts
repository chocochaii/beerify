import styled, { createGlobalStyle } from "styled-components";
import { generateMedia } from "styled-media-query";
import { PrimaryTheme } from "./helpers/theme";
import { Layout, Row } from "antd";

export interface ThemeType {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
  shades?: string[];
  danger?: string;
  media: any;
  transition: string;
}

export const breakpoints = {
  xs: "480px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1600px"
};

const media = generateMedia(breakpoints);

export const theme: ThemeType = {
  ...PrimaryTheme,
  media,
  transition: "cubic-bezier(0.645, 0.045, 0.355, 1)"
};

export const AppContent = styled(Layout.Content)`
  margin-top: ${PrimaryTheme.headerHeight};
  padding: ${PrimaryTheme.contentPadding};
  ${media.lessThan("md")`
    padding: ${PrimaryTheme.contentPaddingMd};
  `}
`;

export const FilterRow = styled(Row)`
  height: ${(props: any) => props.theme.filterHeight};
`;

export const BeerDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-bottom: 8px;
  }
`;

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  & > .ant-tag:first-of-type {
    margin-left: 8px;
  }
`;

export const SpinWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props: any) => props.theme.shades[0]};
  opacity: 0.5;
`;

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: ${PrimaryTheme.fontFamily};
  font-size: ${PrimaryTheme.fontSize};
  background-color: ${PrimaryTheme.backgroundColor};
}
a {
  color: ${PrimaryTheme.link};
  text-decoration: none;
  &:hover {
    color: ${PrimaryTheme.primaryShade};
  }
}
`;
