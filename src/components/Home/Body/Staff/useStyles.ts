import { makeStyles } from '@material-ui/core/styles';

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
