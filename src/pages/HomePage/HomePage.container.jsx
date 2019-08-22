import React, { lazy } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import HomePage from './HomePage';
import Spinner from '../../components/Spinner/Spinner';

const ErrorBoundary = lazy(() =>
  import('../../components/ErrorBoundary/ErrorBoundary')
);

const GET_MOVIES = gql`
  query {
    topRated {
      id
      title
      vote_average
      poster_path
    }
    upcoming {
      id
      title
      release_date
      poster_path
    }
  }
`;

const HomePageContainer = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Spinner />;

  if (error) return <ErrorBoundary>{error.message}</ErrorBoundary>;

  return <HomePage upcoming={data.upcoming} topRated={data.topRated} />;
};

export default HomePageContainer;
