import React from 'react';
import { StyledPagination } from './Pagination.styles';

type Props = {
  refetch: ({ variables: { page } }: { variables: { page: number } }) => void;
  totalPages: number;
  currentPage: number;
  scrollToTop?: React.MutableRefObject<HTMLElement>;
};

const Pagination = ({
  totalPages,
  refetch,
  currentPage,
  scrollToTop,
}: Props) => {
  const [page, setPage] = React.useState(currentPage);

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setPage(value);
    refetch({ variables: { page: value } });
    scrollToTop &&
      scrollToTop.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  return (
    <StyledPagination count={totalPages} onChange={handleChange} page={page} />
  );
};

export default Pagination;
