import { useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';

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
  path: string;
}

export default function PaginationComponent({
  totalPages,
  refetch,
  currentPage,
  element,
  path,
}: Props) {
  const [page, setPage] = useState(currentPage);
  const router = useRouter();

  return (
    <StyledPagination
      count={totalPages}
      page={page}
      onChange={(_evt, pageNumber: number) => {
        element.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setPage(pageNumber);
        refetch(pageNumber);
        router.push(`/${path}/${pageNumber}`);
      }}
    />
  );
}
