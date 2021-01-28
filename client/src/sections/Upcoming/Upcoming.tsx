import { useRef } from "react";
import { ErrorMessage, Pagination, MoviesBox } from "../../components";
import { useGetUpcomingLazyQuery, Upcoming } from "../../graphql";
import { Wrapper } from "./Upcoming.styles";

type Props = {
  initialData: Upcoming;
};

const UpcomingContainer = ({ initialData }: Props) => {
  const [refetch, { data, error }] = useGetUpcomingLazyQuery();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const element = useRef<HTMLDivElement>(null!);

  if (error) return <ErrorMessage error={error} />;

  return (
    <Wrapper ref={element}>
      <MoviesBox
        movies={data?.upcoming.results || initialData.results}
        title="Upcoming"
      />
      <Pagination
        currentPage={data?.upcoming.page || initialData.page}
        refetch={refetch}
        scrollToTop={element}
        totalPages={data?.upcoming.total_pages || initialData.total_pages}
      />
    </Wrapper>
  );
};

export default UpcomingContainer;
