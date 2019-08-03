import React from 'react';
import MoviesUpcoming from '../../components/MoviesUpcoming/MoviesUpcoming';
import MoviesRated from '../../components/MoviesTopRated/MoviesRated';
import WithSpinner from '../../components/WithSpinner/WithSpinner';

const HomePage = () => (
  <>
    <MoviesUpcoming />
    <MoviesRated />
  </>
);

export default WithSpinner(HomePage);
