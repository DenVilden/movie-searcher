import { createMuiTheme } from '@material-ui/core';
import createCache from '@emotion/cache';

export const cache = createCache({ key: 'css', prepend: true });

export const theme = createMuiTheme();
export type Theme = typeof theme;
