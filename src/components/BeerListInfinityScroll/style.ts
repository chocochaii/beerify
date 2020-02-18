import styled from "styled-components";

export const BeerListInfinityScrollWrapper = styled.div`
  ${(props: any) => {
    const wrapperHeight = `calc(100vh - ${props.theme.headerHeight} - ${props.theme.footerHeight} - ${props.theme.breadcrumbHeight} - ${props.theme.filterHeight})`;
    return `height: ${wrapperHeight};
  overflow-y: scroll;
  overflow-x: hidden;`;
  }}
`;
