import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  },
  header: {
    padding: '16px 0',
    letterSpacing: '0px',
    margin: '0px',
    minWidth: '0px',
    fontSize: '1.5rem',
    fontWeight: 800,
    lineHeight: '32px',
    overflowWrap: 'break-word',
    color: theme.palette.info.main,
  },
  checkMark: {
    width: '100px',
    display: 'block',
    margin: '40px auto 0',
  },
  path: {
    strokeDasharray: 1000,
    strokeDashoffset: 0,
  },
  circle: {
    animation: '$dash .9s ease-in-out',
  },
  check: {
    strokeDashoffset: -100,
    animation: '$dash-check .9s .35s ease-in-out forwards',
  },
  '@keyframes dash': {
    '0%': {
      strokeDashoffset: 1000,
    },
    '100%': {
      strokeDashoffset: 0,
    },
  },
  '@keyframes dash-check': {
    '0%': {
      strokeDashoffset: -100,
    },
    '100%': {
      strokeDashoffset: 900,
    },
  },
  closeButton: {
    borderRadius: 16,
    margin: '16px 0',
  },
}));
