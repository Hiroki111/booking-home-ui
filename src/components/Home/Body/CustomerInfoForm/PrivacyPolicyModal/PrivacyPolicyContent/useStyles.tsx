import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    maxWidth: '900px',
    height: '80vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '16px',
  },
}));
