import { makeStyles } from '@material-ui/core/styles';
import { blue, green, grey } from '@material-ui/core/colors';

import { hoverableOption } from '../../../../../../styles/sharedStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    ...hoverableOption(theme),
    cursor: 'pointer',
  },
  staff: {
    padding: '24px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  staffNameAndServices: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  staffName: {
    letterSpacing: '0px',
    margin: '0px',
    fontSize: '1rem',
    fontWeight: 700,
  },
  staffTitle: {
    letterSpacing: '0px',
    margin: '0px',
    fontSize: '1rem',
    fontWeight: 400,
    color: grey[700],
  },
  arrow: {
    fontSize: '1rem',
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: green[500],
    width: '56px',
    height: '56px',
    marginRight: '20px',
  },
  image: {
    borderRadius: '50%',
  },
  initials: {
    backgroundColor: blue[500],
  },
}));
