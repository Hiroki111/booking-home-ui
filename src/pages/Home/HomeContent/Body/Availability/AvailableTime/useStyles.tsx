import { makeStyles } from '@material-ui/core/styles';
import { hoverableOption } from '../../../../../../styles/sharedStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      marginTop: '32px',
    },
    [theme.breakpoints.up('md')]: {
      top: '-22px',
      zIndex: '1200',
      scrollMarginTop: '104px',
    },
  },
  anchor: {
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      top: '-151px',
    },
    [theme.breakpoints.up('md')]: {
      top: '-104px',
    },
  },
  timeSlot: {
    ...hoverableOption(theme),
    padding: '24px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    '& div': {
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  timeSlotHeader: {
    padding: '24px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& p': {
      fontWeight: 600,
      margin: 0,
    },
  },
}));
