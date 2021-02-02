/* eslint-disable react/jsx-props-no-spreading */
import { AppBar, Toolbar, TextField } from "@material-ui/core";
import { useState } from "react";
import {
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  Autocomplete,
  AutocompleteChangeReason,
} from "@material-ui/lab";
import { useRouter } from "next/router";
import Link from "next/link";
import { Search as SearchIcon } from "@material-ui/icons";
import styled from "styled-components";
import { fade } from "@material-ui/core/styles";
import Favorites from "../Favorites/Favorites";
import { useGetMoviesSearchLazyQuery } from "../../graphql";

const StyledAutocomplete = styled((props) => <Autocomplete {...props} />)`
  .MuiInputBase-root::before,
  .MuiInputBase-root::after {
    display: none;
  }

  input {
    color: #fafafa;
  }
`;

const StyledInputBase = styled(TextField)`
  background-color: ${(props) => fade(props.theme.palette.common.white, 0.15)};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  width: 300px;

  ${(props) => props.theme.breakpoints.up("md")} {
    width: 800px;
  }

  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: ${(props) => props.theme.spacing(4)}px;
  }

  :hover {
    background-color: ${(props) =>
      fade(props.theme.palette.common.white, 0.25)};
    border: 0;
  }
`;

export const Header = () => {
  const [inputValue, setInputValue] = useState("");

  const [fetchMovies, { data, loading, error }] = useGetMoviesSearchLazyQuery();

  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <img alt="logo" src="/logo.svg" />
        </Link>
        <StyledAutocomplete
          forcePopupIcon
          popupIcon={!inputValue && <SearchIcon />}
          autoHighlight
          blurOnSelect
          freeSolo
          loading={loading}
          onChange={(
            _evt: React.ChangeEvent<HTMLLIElement>,
            value: string,
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
            _evt: React.ChangeEvent<HTMLInputElement>,
            value: string,
            reason: AutocompleteInputChangeReason
          ) => {
            if (reason === "input" && value) {
              setInputValue(value);
              fetchMovies({ variables: { query: value, pageSize: 8 } });
            } else {
              setInputValue("");
            }
          }}
          open={!!inputValue}
          options={data?.moviesSearch.results.map((movie) => movie.title) || []}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <StyledInputBase
              {...params}
              error={!!error}
              variant="outlined"
              margin="dense"
              value={inputValue}
              placeholder="type a movie name..."
            />
          )}
        />
        <Favorites />
      </Toolbar>
    </AppBar>
  );
};

const WithHeader = (Component: React.ComponentType) => ({ ...pageProps }) => (
  <>
    <Header />
    <Component {...pageProps} />
  </>
);

export default WithHeader;
