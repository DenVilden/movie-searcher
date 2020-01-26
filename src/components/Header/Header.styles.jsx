import { InputBase } from '@material-ui/core';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export const SearchBar = styled.div`
  background-color: ${({ theme }) => fade(theme.palette.common.white, 0.15)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  position: relative;
  width: auto;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-left: ${({ theme }) => theme.spacing(6)}px;
  }

  :hover {
    background-color: ${({ theme }) => fade(theme.palette.common.white, 0.25)};
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  height: 100%;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  pointer-events: none;
  position: absolute;
  width: ${({ theme }) => theme.spacing(4)}px;
`;

export const StyledInputBase = styled(InputBase)`
  &.MuiInputBase-root {
    color: inherit;
  }

  .MuiInputBase-input {
    padding: ${({ theme }) => theme.spacing(1, 1, 1, 7)};
    width: 190px;

    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 400px;
    }
  }
`;

export const LogoContainer = styled(Link)`
  cursor: pointer;
  display: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;
