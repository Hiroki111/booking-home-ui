import makeStyles from '@mui/styles/makeStyles';
import { grey } from '@mui/material/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '12px 32px',
    '& p': {
      margin: 0,
    },
  },
  selectedServiceNameAndPrice: {
    width: '100%',
    fontWeight: 500,
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  price: {
    width: 'max-content',
  },
  selectedServiceTime: {
    fontSize: '1rem',
    lineHeight: '1.25rem',
    color: grey[500],
    paddingTop: '2px',
  },
}));
