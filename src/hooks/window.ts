import { useTheme, useMediaQuery } from '@mui/material';

export function useIsSmallWindow() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}
