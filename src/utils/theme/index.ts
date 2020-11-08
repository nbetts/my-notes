import { ThemeType } from 'grommet';

export const colors = {
  brand: '#38353A',
  'accent-1': '#5EFC8D',
  'accent-2': '#8EF9F3',
  'accent-3': '#93BEDF',
  'accent-4': '#8377D1',
  'neutral-1': '#04B439',
  'neutral-2': '#09AEA6',
  'neutral-3': '#2A628D',
  'neutral-4': '#3B2F89',
  'status-error': '#FF3A3A',
}

const theme: ThemeType = {
  global: {
    font: {
      family: `-apple-system, BlinkMacSystemFont, "Segoe UI"`,
    },
    colors,
    elevation: {
      dark: {
        xsmall: '0px 2px 2px rgba(0, 0, 0, 0.40)',
        small: '0px 4px 4px rgba(0, 0, 0, 0.40)',
        medium: '0px 6px 8px rgba(0, 0, 0, 0.40)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.40)',
        xlarge: '0px 12px 24px rgba(0, 0, 0, 0.40)',
      }
    }
  },
};

export default theme;
