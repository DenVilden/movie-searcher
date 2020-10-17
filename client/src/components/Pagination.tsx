import React, { useState } from 'react';
import styled from 'styled-components';
import { Pagination as PaginationComponent } from '@material-ui/lab';

const StyledPagination = styled(PaginationComponent)`
  margin: auto;
`;

type Props = {
  refetch: ({ variables: { page } }: { variables: { page: number } }) => void;
  totalPages: number;
  currentPage: number;
  scrollToTop: React.MutableRefObject<HTMLElement>;
};

const Pagination = ({
  totalPages,
  refetch,
  currentPage,
  scrollToTop,
}: Props) => {
  const [page, setPage] = useState(currentPage);

  return (
    <StyledPagination
      count={totalPages}
      onChange={(_, value: number) => {
        setPage(value);
        refetch({ variables: { page: value } });
        scrollToTop &&
          scrollToTop.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      }}
      page={page}
    />
  );
};

export default Pagination;
