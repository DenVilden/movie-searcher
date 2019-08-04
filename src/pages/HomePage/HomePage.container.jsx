import React from 'react';
import { useSelector } from 'react-redux';
import HomePage from './HomePage';
import { fetchRatedStart } from '../../actions/rated.action';
import { fetchUpcomingStart } from '../../actions/upcoming.action';
import useFetchEffect from '../../hooks/useFetchEffect';
import { selectUpcomingFetching } from '../../selectors/upcoming.selector';
import { selectRatedFetching } from '../../selectors/rated.selector';

const HomePageContainer = () => {
  const upcomingLoading = useSelector(selectUpcomingFetching);
  const ratedLoading = useSelector(selectRatedFetching);

  useFetchEffect(fetchRatedStart);
  useFetchEffect(fetchUpcomingStart);

  return <HomePage loading={upcomingLoading && ratedLoading} />;
};

export default HomePageContainer;
