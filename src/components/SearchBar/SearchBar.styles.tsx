import { InputBase, Theme } from '@material-ui/core';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';

export const StyledSearchBar = styled.div`
  background-color: ${({ theme }: { theme: Theme }) =>
    fade(theme.palette.common.white, 0.15)};
  border-radius: ${({ theme }: { theme: Theme }) => theme.shape.borderRadius}px;
  position: relative;
  width: auto;

  ${({ theme }: { theme: Theme }) => theme.breakpoints.up('sm')} {
    margin-left: ${({ theme }: { theme: Theme }) => theme.spacing(6)}px;
  }

  :hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      fade(theme.palette.common.white, 0.25)};
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  height: 100%;
  margin-left: ${({ theme }: { theme: Theme }) => theme.spacing(1)}px;
  pointer-events: none;
  position: absolute;
  width: ${({ theme }: { theme: Theme }) => theme.spacing(4)}px;
`;

export const StyledInputBase = styled(InputBase)`
  &.MuiInputBase-root {
    color: inherit;
  }

  .MuiInputBase-input {
    padding: ${({ theme }: { theme: Theme }) => theme.spacing(1, 1, 1, 7)};
    width: 190px;

    ${({ theme }: { theme: Theme }) => theme.breakpoints.up('md')} {
      width: 400px;
    }
  }
`;
