import React from 'react';
import {
  StyledSearchBar,
  StyledSearchIcon,
  StyledInputBase,
} from './SearchBar.styles';

type Props = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

const SearchBar = ({ inputValue, setInputValue }: Props) => (
  <StyledSearchBar>
    <StyledSearchIcon />
    <label aria-label="search bar" htmlFor="input">
      <StyledInputBase
        id="input"
        onChange={evt => setInputValue(evt.target.value)}
        placeholder="type a movie name..."
        type="search"
        value={inputValue}
      />
    </label>
  </StyledSearchBar>
);

export default SearchBar;
