import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: 'block',
    padding: '0px 58px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '960px',
    height: '135px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 24px',
    },
  },
  closeBtnContainer: {
    height: '56px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginBottom: '-38px',
    },
  },
  crossSign: {
    position: 'relative',
    '&::before, &::after': {
      position: 'absolute',
      content: "' '",
      height: '18px',
      width: '2px',
      backgroundColor: 'white',
    },
    '&::before': {
      transform: 'rotate(45deg)',
    },
    '&::after': {
      transform: 'rotate(-45deg)',
    },
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  crossPath: {
    fill: 'white',
  },
  step: {
    fontWeight: 400,
  },
  pageTitle: {
    fontSize: '2rem',
    fontWeight: 800,
  },
  arrowBackIcon: {
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      marginLeft: '-32px',
    },
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));
