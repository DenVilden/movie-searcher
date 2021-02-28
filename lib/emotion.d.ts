import type { MaterialTheme } from './setupTests';

declare module '@emotion/react' {
  export interface Theme extends MaterialTheme {}
}
