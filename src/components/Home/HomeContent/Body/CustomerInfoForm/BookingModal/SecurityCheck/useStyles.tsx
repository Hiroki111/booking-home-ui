import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  code: {
    marginBottom: 14,
    fontWeight: 800,
  },
  captchaWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshCode: {
    color: theme.palette.info.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.info.light,
    },
  },
}));
