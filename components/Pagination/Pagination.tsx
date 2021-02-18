import { useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';

const StyledPagination = styled(Pagination)`
  margin: auto;
  margin-bottom: 10px;

  ${(props) => props.theme.breakpoints.up('md')} {
    margin-bottom: 35px;
  }
`;

interface Props {
  refetch: (page: number) => void;
  totalPages: number;
  currentPage: number;
  element: React.MutableRefObject<HTMLDivElement | null>;
}

export default function PaginationComponent({
  totalPages,
  refetch,
  currentPage,
  element,
}: Props) {
  const [page, setPage] = useState(currentPage);

  return (
    <StyledPagination
      count={totalPages}
      page={page}
      onChange={(_evt, value: number) => {
        element.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        refetch(value);
        setPage(value);
      }}
    />
  );
}
