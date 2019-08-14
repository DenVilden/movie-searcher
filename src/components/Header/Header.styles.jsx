import React from 'react';
import { fade } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Search as SearchIcon } from '@material-ui/icons';
import { InputBase } from '@material-ui/core';
import { ReactComponent as Logo } from '../../assets/camera.svg';

export const SearchBar = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background-color: ${({ theme }) => fade(theme.palette.common.white, 0.15)};
  position: relative;
  width: auto;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-left: ${({ theme }) => theme.spacing(6)}px;
  }
  &:hover {
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

export const StyledInputBase = styled(props => (
  <InputBase
    classes={{
      root: 'root',
      input: 'input'
    }}
    {...props}
  />
))`
  &.root {
    color: inherit;
  }
  & .input {
    padding: ${({ theme }) => theme.spacing(1, 1, 1, 7)};
    transition: ${({ theme }) => theme.transitions.create('width')};
    width: 190px;
    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 400px;
    }
  }
`;

export const StyledLogo = styled(props => <Logo {...props} />)`
  cursor: pointer;
  display: none;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;
