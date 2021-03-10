import styled from '@emotion/styled';
import { Pagination, PaginationItem } from '@material-ui/core';
import Link from 'next/link';

const StyledPagination = styled(Pagination)`
  margin: auto;
  margin-bottom: 10px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-bottom: 35px;
  }
`;

interface Props {
  currentPage: number;
  path: string;
  totalPages: number;
}

export default function PaginationComponent({
  totalPages,
  currentPage,
  path,
}: Props) {
  return (
    <StyledPagination
      count={totalPages}
      page={currentPage}
      renderItem={({ page, ...otherProps }) => {
        const item = <PaginationItem {...otherProps} page={page} />;
        return page ? <Link href={`/${path}/${page}`}>{item}</Link> : item;
      }}
    />
  );
}
