import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const Error = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(4)}px;
`;

export default Error;
