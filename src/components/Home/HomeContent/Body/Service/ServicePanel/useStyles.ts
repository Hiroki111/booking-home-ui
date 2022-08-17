import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
  serviceItems: {
    padding: '24px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  serviceItemCheckBox: {
    height: '36px',
    width: '64px',
  },
  checkedServiceItem: {
    color: theme.palette.info.dark,
  },
  serviceItemDetails: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceBold: {
    letterSpacing: '0px',
    margin: '0px',
    fontSize: '1rem',
    fontWeight: 700,
  },
  price: {
    width: 'max-content',
  },
  serviceLight: {
    letterSpacing: '0px',
    margin: '0px',
    minWidth: '0px',
    fontSize: '1rem',
    color: grey[500],
  },
  disabled: {
    color: grey[500],
  },
}));
