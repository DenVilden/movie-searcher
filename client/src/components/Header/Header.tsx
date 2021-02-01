import { AppBar, Toolbar } from "@material-ui/core";
import { useState } from "react";
import {
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
} from "@material-ui/lab";
import { useRouter } from "next/router";
import Link from "next/link";
import { Favorites } from "..";
import { useGetMoviesSearchLazyQuery } from "../../graphql";
import {
  StyledAutocomplete,
  StyledSearchBar,
  StyledSearchIcon,
  StyledInputBase,
} from "./Header.styles";

export const Header = () => {
  const [inputValue, setInputValue] = useState("");

  const [fetchMovies, { data, loading }] = useGetMoviesSearchLazyQuery();

  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <img alt="logo" src="/logo.svg" />
        </Link>
        <StyledAutocomplete
          autoHighlight
          blurOnSelect="touch"
          freeSolo
          inputValue={inputValue}
          loading={loading}
          onChange={(
            _evt: React.ChangeEvent<HTMLLIElement>,
            value: string | null
          ) => {
            const id = data?.moviesSearch.results.find(
              (movie) => movie.title === value
            )?.id;
            router.push(`/movie/${id}`);
          }}
          onInputChange={(
            _evt: React.ChangeEvent<HTMLInputElement>,
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
          renderInput={(params: AutocompleteRenderInputParams) => (
            <StyledSearchBar>
              <StyledSearchIcon />
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <StyledInputBase {...params} placeholder="type a movie name..." />
            </StyledSearchBar>
          )}
        />
        <Favorites />
      </Toolbar>
    </AppBar>
  );
};

const withHeader = (Component: React.ComponentType) => ({ ...pageProps }) => (
  <>
    <Header />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </>
);

export default withHeader;
