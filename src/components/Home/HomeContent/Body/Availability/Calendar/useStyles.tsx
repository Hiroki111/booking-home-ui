import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  timeTableLayout: {
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '320px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '500px',
    },
  },
  dayScaleLayout: {
    borderRadius: '8px',
    // @media (max-width: 959.95px)
    [theme.breakpoints.down('sm')]: {
      minWidth: '320px',
    },
    // @media (min-width: 960px)
    [theme.breakpoints.up('md')]: {
      minWidth: '500px',
    },
  },
}));
