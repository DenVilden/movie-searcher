import { useRef } from "react";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";
import MoviesBox from "../components/MoviesBox";
import { useGetTopRatedLazyQuery, TopRated } from "../graphql/__generated__";
import Pagination from "../components/Pagination";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  initialData: TopRated;
};

const TopRatedContainer = ({ initialData }: Props) => {
  const [refetch, { data, error }] = useGetTopRatedLazyQuery();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const element = useRef<HTMLDivElement>(null!);

  if (error) return <ErrorMessage error={error} />;

  return (
    <Wrapper ref={element}>
      <MoviesBox
        movies={data?.topRated.results || initialData.results}
        title="Top Rated"
      />
      <Pagination
        currentPage={data?.topRated.page || initialData.page}
        refetch={refetch}
        scrollToTop={element}
        totalPages={data?.topRated.total_pages || initialData.total_pages}
      />
    </Wrapper>
  );
};

export default TopRatedContainer;
