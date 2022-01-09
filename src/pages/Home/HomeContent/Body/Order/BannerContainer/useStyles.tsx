import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    objectFit: 'contain',
  },
  addressContainer: {
    padding: '24px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      margin: 0,
      fontSize: '1rem',
      lineHeight: '1.25rem',
      paddingTop: '2px',
    },
  },
  name: {
    fontWeight: 600,
  },
  address: {
    color: grey[500],
  },
}));
