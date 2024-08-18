import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '8px',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      marginTop: '-48px',
      zIndex: 1200,
    },
  },
  noStaffAvailable: {
    padding: '16px',
  },
}));
