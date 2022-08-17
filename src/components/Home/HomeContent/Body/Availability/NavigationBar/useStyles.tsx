import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  monthLabel: {
    cursor: 'unset',
    display: 'initial',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}));
