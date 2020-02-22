import React from 'react';
import { StyledPagination } from './Pagination.styles';

const Pagination = ({
  totalPages,
  refetch,
  currentPage,
  scrollToTop,
}: {
  refetch: ({ page }: { page: number }) => void;
  totalPages: number;
  currentPage: number;
  scrollToTop: () => void;
}) => {
  const [page, setPage] = React.useState(currentPage);

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setPage(value);
    refetch({ page: value });
    scrollToTop();
  };

  return (
    <StyledPagination count={totalPages} onChange={handleChange} page={page} />
  );
};

export default Pagination;
