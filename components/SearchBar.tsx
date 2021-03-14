import { TextField, Autocomplete } from '@material-ui/core'
import { alpha } from '@material-ui/core/styles'
import { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Search as SearchIcon } from '@material-ui/icons'
import Link from 'next/link'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import {
  useGetMoviesSearchLazyQuery,
  MoviesSearchResults,
} from 'apollo/__generated__'

const StyledAutocomplete = styled(Autocomplete)`
  width: 70%;

  input {
    margin-left: ${({ theme }) => theme.spacing(5)};
  }
`

const StyledTextField = styled(TextField)`
  background-color: ${({ theme }) => alpha(theme.palette.common.black, 0.15)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-left: ${({ theme }) => theme.spacing(1)};
  }
`

const StyledSearchIcon = styled(SearchIcon)`
  font-size: 25px;
  height: 100%;
  margin-left: ${({ theme }) => theme.spacing(2)};
  position: absolute;
  top: 0;
  user-select: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-left: ${({ theme }) => theme.spacing(3)};
  }
`

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('')
  const [fetchMovies, { data, loading, error }] = useGetMoviesSearchLazyQuery()

  return (
    <StyledAutocomplete
      blurOnSelect
      disablePortal
      filterOptions={options => options}
      freeSolo
      getOptionLabel={(movie: any) => movie.title}
      id="autocomplete"
      inputValue={inputValue}
      loading={
        loading ||
        !!error ||
        (!data?.moviesSearch.results.length && !!inputValue.trim())
      }
      loadingText={loading ? 'Loading...' : error?.message || 'No results'}
      onInputChange={(_evt, value: string, reason) => {
        if (reason === 'input') {
          setInputValue(value)

          const newValue = value.trim()

          if (newValue && newValue !== inputValue.trim()) {
            fetchMovies({ variables: { query: newValue } })
          }
        }
        if (reason === 'clear') {
          setInputValue('')
        }
      }}
      openOnFocus
      options={(inputValue.trim() && data?.moviesSearch.results) || []}
      renderInput={params => (
        <>
          <StyledSearchIcon />
          <StyledTextField
            {...params}
            error={!!error}
            fullWidth
            id="search field"
            placeholder="Search..."
            size="small"
          />
        </>
      )}
      renderOption={(props, option: any, { inputValue: value }) => {
        const movie: MoviesSearchResults = option
        const matches = match(movie.title, value)
        const parts = parse(movie.title, matches)

        return (
          <Link href={`/${movie.media_type}/${movie.id}`}>
            <li {...props}>
              <span>
                {parts.map(part => (
                  <span
                    css={css`
                      ${part.highlight &&
                      css`
                        font-weight: 700;
                      `};
                      white-space: pre-wrap;
                    `}
                  >
                    {part.text}
                  </span>
                ))}
              </span>
            </li>
          </Link>
        )
      }}
    />
  )
}
