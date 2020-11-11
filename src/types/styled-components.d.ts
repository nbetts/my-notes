import 'styled-components';
import { ThemeType } from 'grommet';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
