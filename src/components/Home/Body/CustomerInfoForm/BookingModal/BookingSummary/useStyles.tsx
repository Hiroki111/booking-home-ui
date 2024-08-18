import makeStyles from '@mui/styles/makeStyles';
import { grey } from '@mui/material/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  contentRow: {
    padding: '12px 0',
    borderBottom: `0.5px solid ${grey[500]}`,
    '& p': {
      fontWeight: 600,
      fontSize: '1rem',
      margin: 0,
      padding: '0 30px',
      [theme.breakpoints.down('md')]: {
        fontSize: '.75rem',
      },
    },
  },
  sectionName: {
    fontWeight: 600,
    fontSize: '1rem',
    color: grey[500],
    [theme.breakpoints.down('md')]: {
      fontSize: '.75rem',
    },
  },
  selectedService: {
    padding: '4px 0',
  },
  selectedServiceNameAndPrice: {
    display: 'flex',
    justifyContent: 'space-between',
    '& p': {
      fontWeight: 500,
    },
  },
  totalServicePrice: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
