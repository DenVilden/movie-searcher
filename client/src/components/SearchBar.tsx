/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from "@material-ui/lab";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { fade } from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";
import { useGetMoviesSearchLazyQuery } from "../graphql";

const StyledAutocomplete = styled((props) => <Autocomplete {...props} />)`
  .MuiInputBase-root:before,
  .MuiInputBase-root:after {
    display: none;
  }

  input {
    color: #fafafa;
  }
`;

const StyledSearchBar = styled.div`
  background-color: ${(props) => fade(props.theme.palette.common.white, 0.15)};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  position: relative;
  width: auto;

  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: ${(props) => props.theme.spacing(6)}px;
  }

  :hover {
    background-color: ${(props) =>
      fade(props.theme.palette.common.white, 0.25)};
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  height: 100%;
  margin-left: ${(props) => props.theme.spacing(1)}px;
  pointer-events: none;
  position: absolute;
  width: ${(props) => props.theme.spacing(4)}px;
`;

const StyledInputBase = styled(TextField)`
  padding: ${(props) => props.theme.spacing(0.5, 0.5, 0.3, 7)};
  width: 300px;
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 800px;
  }
`;

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const [fetchMovies, { data, loading }] = useGetMoviesSearchLazyQuery();

  const router = useRouter();

  return (
    <StyledAutocomplete
      autoHighlight
      blurOnSelect="touch"
      freeSolo
      inputValue={inputValue}
      loading={loading}
      onChange={(
        _: React.ChangeEvent<HTMLLIElement>,
        value: string | null,
        reason: AutocompleteChangeReason
      ) => {
        if (reason === "select-option") {
          const id = data?.moviesSearch.results.find(
            (movie) => movie.title === value
          )?.id;
          router.push(`/movie/${id}`);
        }
      }}
      onInputChange={(
        _: React.ChangeEvent<HTMLInputElement>,
        value: string,
        reason: AutocompleteInputChangeReason
      ) => {
        if (reason === "input") {
          setInputValue(value);
          fetchMovies({ variables: { query: value, pageSize: 8 } });
        } else {
          setInputValue("");
        }
      }}
      open={!!inputValue}
      options={data?.moviesSearch.results.map((movie) => movie.title) || []}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderInput={(params: any) => (
        <StyledSearchBar>
          <StyledSearchIcon />
          <StyledInputBase {...params} placeholder="type a movie name..." />
        </StyledSearchBar>
      )}
    />
  );
};

export default SearchBar;
