import styled from "styled-components";
import { Layout } from "antd";

export const Header = styled(Layout.Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: ${(props: any) => props.theme.primary};
  padding: ${(props: any) => props.theme.contentPadding};
  ${(props: any) => props.theme.media.lessThan("md")`
    padding: ${(props: any) => props.theme.contentPaddingMd};
  `}
  a {
    color: ${(props: any) => props.theme.shades[0]};
    &:hover {
      color: inherit;
    }
  }
`;
