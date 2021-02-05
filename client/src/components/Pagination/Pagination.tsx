import { useState } from "react";
import styled from "styled-components";
import { Pagination } from "@material-ui/lab";

const StyledPagination = styled(Pagination)`
  margin: auto;
`;

interface Props {
  refetch: (page: number) => void;
  totalPages: number;
  currentPage: number;
  scrollToTop: React.MutableRefObject<HTMLElement | null>;
}

const PaginationComponent = ({
  totalPages,
  refetch,
  currentPage,
  scrollToTop,
}: Props) => {
  const [page, setPage] = useState(currentPage);

  return (
    <StyledPagination
      count={totalPages}
      onChange={(_evt, value: number) => {
        setPage(value);
        refetch(value);
        scrollToTop.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
      page={page}
    />
  );
};

export default PaginationComponent;
