import styled from "styled-components";
import { Layout } from "antd";

export const Footer = styled(Layout.Footer)`
  position: fixed;
  z-index: 1;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: ${(props: any) => props.theme.footerHeight};
`;
