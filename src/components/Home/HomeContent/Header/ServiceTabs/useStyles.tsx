import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  menuTab: {
    textTransform: 'initial',
    opacity: 1,
    minWidth: '115px',
  },
  selectedTabChip: {
    fontWeight: 600,
    '&.MuiChip-root.MuiChip-clickable': {
      backgroundColor: 'white',
    },
  },
  tabChip: {
    fontWeight: 600,
    '&.MuiChip-root.MuiChip-clickable': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      border: 0,
    },
    '&.MuiChip-root.MuiChip-clickable:hover': {
      backgroundColor: 'white',
      color: 'black',
      border: 0,
    },
  },
}));
