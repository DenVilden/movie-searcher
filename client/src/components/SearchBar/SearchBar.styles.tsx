import { InputBase } from '@material-ui/core';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';

export const StyledSearchBar = styled.div`
  background-color: ${props => fade(props.theme.palette.common.white, 0.15)};
  border-radius: ${props => props.theme.shape.borderRadius}px;
  position: relative;
  width: auto;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-left: ${props => props.theme.spacing(6)}px;
  }

  :hover {
    background-color: ${props => fade(props.theme.palette.common.white, 0.25)};
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  height: 100%;
  margin-left: ${props => props.theme.spacing(1)}px;
  pointer-events: none;
  position: absolute;
  width: ${props => props.theme.spacing(4)}px;
`;

export const StyledInputBase = styled(InputBase)`
  &.MuiInputBase-root {
    color: inherit;
  }

  .MuiInputBase-input {
    padding: ${props => props.theme.spacing(1, 1, 1, 7)};
    width: 190px;

    ${props => props.theme.breakpoints.up('md')} {
      width: 400px;
    }
  }
`;
