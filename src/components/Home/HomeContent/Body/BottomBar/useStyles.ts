import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  bottomNavigation: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  bookigButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
