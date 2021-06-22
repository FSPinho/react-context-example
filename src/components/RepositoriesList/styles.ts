import styled from "styled-components";

export const Root = styled.div`
  padding: 8px;
`

export const RepoCard = styled.div`
  border-radius: 4px;
  border: 1px black solid;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RepoCardTitle = styled.div`
  flex: 2;
`;

export const RepoCardInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const PaginationBtn = styled.button<{active?: boolean}>`
  border: none;
  outline: none;
  background-color: ${p => p.active ? "#DDD" : "#EEE"};
  border-radius: 50%;
  margin: 8px;
`;
