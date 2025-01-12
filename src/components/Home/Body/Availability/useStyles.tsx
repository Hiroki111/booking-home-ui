import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  schedulerContainer: {
    borderRadius: '8px',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      top: '-48px',
      zIndex: '1200',
    },
  },
  toolbarRoot: {
    '& .MuiButton-label': {
      fontSize: '1rem',
      textTransform: 'capitalize',
    },
  },
}));
