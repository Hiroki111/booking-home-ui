import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90vw',
    maxWidth: '900px',
    maxHeight: '100vh',
    minHeight: '500px',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px 0',
  },
  bookButton: {
    fontWeight: 600,
  },
  alert: {
    marginTop: '12px',
  },
  redirectLink: {
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
