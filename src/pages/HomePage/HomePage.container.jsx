import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import HomePage from './HomePage';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/Error/Error';

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
  const {
    loading,
    error,
    data: { upcoming, topRated }
  } = useQuery(GET_MOVIES);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <Error align="center" color="error" variant="h6">
        {error.message}
      </Error>
    );
  }

  return <HomePage topRated={topRated} upcoming={upcoming} />;
};

export default HomePageContainer;
