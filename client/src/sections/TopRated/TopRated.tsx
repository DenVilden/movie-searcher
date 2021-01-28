import { useRef } from "react";
import { MoviesBox, ErrorMessage, Pagination } from "../../components";
import { useGetTopRatedLazyQuery, TopRated } from "../../graphql";
import { Wrapper } from "./TopRated.styles";

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
