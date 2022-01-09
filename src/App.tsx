import { SnackbarProvider } from 'notistack';
import { Grow } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

import { RootRouter } from './pages';
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
        <RootRouter />
      </SnackbarProvider>
    </RootThemeProvider>
  );
}
