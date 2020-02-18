import styled from "styled-components";
import { Card } from "antd";

export const BeerCard = styled(Card)`
  height: 100%;
  .ant-card-cover {
    min-height: 200px;
    ${(props: any) => props.theme.media.lessThan("md")`
      min-height: 140px;
    `}
  }
  .anticon {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 30px;
    transform-origin: center;
    transition: 0.2s transform ease;
    &:hover {
      transform: scale(1.2);
    }
  }
`;
