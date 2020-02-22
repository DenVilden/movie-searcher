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
  scrollToTop?: React.MutableRefObject<HTMLElement>;
}) => {
  const [page, setPage] = React.useState(currentPage);

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setPage(value);
    refetch({ page: value });
    scrollToTop &&
      scrollToTop.current.scrollIntoView({
        behavior: 'smooth',
      });
  };

  return (
    <StyledPagination count={totalPages} onChange={handleChange} page={page} />
  );
};

export default Pagination;
