import { SnackbarProvider } from 'notistack';
import { Grow } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

import { Home } from './components/Home';
import { RootThemeProvider } from './theme/RootThemeProvider';

export default function App() {
  return (
    <RootThemeProvider>
      {/** SnackbarProvider has to be a child of ThemeProvider*/}
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        TransitionComponent={Grow as React.ComponentType<TransitionProps>}
      >
        <Home />
      </SnackbarProvider>
    </RootThemeProvider>
  );
}
