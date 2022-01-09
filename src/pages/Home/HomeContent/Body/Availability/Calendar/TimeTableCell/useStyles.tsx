import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import { hoverableOption } from '../../../../../../../styles/sharedStyles';

export const useStyles = makeStyles((theme) => ({
  dayCell: {
    height: 70,
    position: 'relative',
    '& div': {
      fontSize: '1rem',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '-ms-transform': 'translate(-50%, -50%)',
    },
  },
  availableDay: hoverableOption(theme),
  unavailableDay: {
    backgroundColor: '#F2F2F7',
    height: 70,
  },
  selectedDay: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));
