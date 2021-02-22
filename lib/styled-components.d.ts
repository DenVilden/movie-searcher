import type { Theme as CustomTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
