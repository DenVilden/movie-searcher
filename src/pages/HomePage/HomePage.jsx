import React from 'react';
import MoviesUpcoming from '../../components/MoviesUpcoming/MoviesUpcoming';
import MoviesRated from '../../components/MoviesTopRated/MoviesRated';

const HomePage = () => (
  <>
    <MoviesUpcoming />
    <MoviesRated />
  </>
);

export default HomePage;
