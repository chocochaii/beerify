import styled from "styled-components";
import { Breadcrumb as bc } from "antd";

export const Breadcrumb = styled(bc)`
  display: flex;
  align-items: center;
  height: ${(props: any) => props.theme.breadcrumbHeight};
  & > span:last-child {
    a {
      pointer-events: none;
      font-weight: bold;
    }
  }
`;

export const BreadcrumbItem = styled(bc.Item)`
  a {
    text-transform: Capitalize;
    &:hover {
      color: ${(props: any) => props.theme.primaryShade};
    }
  }
`;
