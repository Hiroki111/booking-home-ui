import makeStyles from '@mui/styles/makeStyles';
import { grey } from '@mui/material/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: grey[100],
  },
  gridContainer: {
    minWidth: '360px',
    width: '100%',
    maxWidth: '960px',
    minHeight: 'calc(100vh - 135px)',
    margin: '0px auto',
    [theme.breakpoints.up('sm')]: {
      padding: '0px 24px',
    },
    '& > div.left': {
      padding: '16px',
      [theme.breakpoints.up('md')]: {
        paddingBottom: '64px',
        paddingTop: '16px',
      },
    },
    '& > div.right': {
      padding: '16px',
      [theme.breakpoints.down('md')]: {
        paddingBottom: '64px',
        paddingTop: '16px',
      },
    },
  },
  order: {
    padding: '16px',
    borderRadius: '8px',
  },
  circularProgressContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '32px',
  },
  circularProgress: {
    color: theme.palette.info.main,
  },
}));
