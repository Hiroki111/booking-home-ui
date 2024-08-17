import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, Theme, StyledEngineProvider, createTheme, adaptV4Theme } from '@mui/material/styles';
import './fonts.css';

import { grey } from '@mui/material/colors';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme(
  adaptV4Theme({
    typography: {
      fontFamily: ['Open Sans'].join(','),
    },
    palette: {
      primary: {
        main: grey[900],
      },
    },
  }),
);

export function RootThemeProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
