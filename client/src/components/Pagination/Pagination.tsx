import { useState } from "react";
import { StyledPagination } from "./Pagination.styles";

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
  const [page, setPage] = useState(currentPage);

  return (
    <StyledPagination
      count={totalPages}
      onChange={(_evt, value: number) => {
        setPage(value);
        refetch({ variables: { page: value } });
        return (
          scrollToTop &&
          scrollToTop.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        );
      }}
      page={page}
    />
  );
};

export default Pagination;
