import type { Theme as MaterialTheme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends MaterialTheme {}
}
