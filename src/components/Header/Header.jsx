import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { SearchBar, StyledSearchIcon, StyledInputBase } from './Header.styles';
import MoviesFavorites from '../MoviesFavorites/MoviesFavorites';
import MoviesSearch from '../MoviesSearch/MoviesSearch';
import { ReactComponent as Logo } from '../../assets/camera.svg';
import useInputState from '../../hooks/useInputState';
import { selectMoviesFetching } from '../../selectors/movies.selector';
import Spinner from '../Spinner/Spinner';

const Header = () => {
  const loading = useSelector(selectMoviesFetching);
  const [inputValue, setValue, clearValue] = useInputState();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" noWrap variant="h6">
            <Link onClick={clearValue} to="/">
              <Logo />
            </Link>
          </Typography>
          <SearchBar>
            <StyledSearchIcon />
            <StyledInputBase
              onChange={setValue}
              placeholder="type a movie name..."
              type="search"
              value={inputValue}
            />
          </SearchBar>
          <MoviesFavorites />
        </Toolbar>
      </AppBar>
      {loading ? <Spinner /> : inputValue && <MoviesSearch />}
    </>
  );
};

export default Header;
