import { useState } from 'react';
import styled from '@emotion/styled';
import { Pagination } from '@material-ui/core';
import { useRouter } from 'next/router';

const StyledPagination = styled(Pagination)`
  margin: auto;
  margin-bottom: 10px;

  ${(props) => props.theme.breakpoints.up('md')} {
    margin-bottom: 35px;
  }
`;

interface Props {
  totalPages: number;
  currentPage: number;
  path: string;
}

export default function PaginationComponent({
  totalPages,
  currentPage,
  path,
}: Props) {
  const [page, setPage] = useState(currentPage);
  const router = useRouter();

  return (
    <StyledPagination
      count={totalPages}
      page={page}
      onChange={(_evt, pageNumber: number) => {
        setPage(pageNumber);
        router.push(`/${path}/${pageNumber}`);
      }}
    />
  );
}
