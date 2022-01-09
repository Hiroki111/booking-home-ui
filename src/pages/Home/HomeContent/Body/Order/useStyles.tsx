import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      top: '104px',
      marginTop: '-48px',
      zIndex: '1200',
    },
  },
  order: {
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
  },
  selectedServicesContainer: {
    padding: '12px 0',
  },
  selectedStaffContainer: {
    padding: '12px 0',
  },
  selectedService: {
    padding: '12px 32px',
    '& p': {
      margin: 0,
    },
  },
  noServiceSelectedMessage: {
    color: grey[500],
    padding: '0 32px',
  },
  selectedStaff: {
    padding: '0 32px',
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  selectedTimeSlotContainer: {
    padding: '12px 0',
    '& p': {
      padding: '0 32px',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 600,
    },
  },
  orderSummary: {
    padding: '28px 32px',
    '& div': {
      display: 'flex',
      justifyContent: 'space-between',
      '& p': {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        margin: 0,
      },
    },
  },
  tax: {
    paddingBottom: '4px',
    '& p': {
      fontWeight: 500,
      color: grey[500],
    },
  },
  total: {
    '& p': {
      fontWeight: 600,
    },
  },
}));
