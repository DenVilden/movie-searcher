import React from 'react';
import { StyledPagination } from './Pagination.styles';

const Pagination = ({
  totalPages,
  refetch,
  currentPage,
}: {
  refetch: ({ page }: { page: number }) => void;
  totalPages: number;
  currentPage: number;
}) => {
  const [page, setPage] = React.useState(currentPage);

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setPage(value);
    refetch({ page: value });
  };

  return (
    <StyledPagination count={totalPages} onChange={handleChange} page={page} />
  );
};

export default Pagination;
