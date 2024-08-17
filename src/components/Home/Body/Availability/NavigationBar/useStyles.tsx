import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  monthLabel: {
    '&&': {
      cursor: 'unset',
      display: 'initial',
      '&:hover': {
        backgroundColor: '#fff',
      },
    },
  },
}));
