import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    zIndex: 1200,
    padding: '16px 0',
    borderRadius: '8px',
    top: '104px',
    marginTop: '-48px',
  },
  menuBarButton: {
    opacity: 1,
    minWidth: '125px',
  },
  menuBarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  menuBarItemContainer: {
    width: '95%',
  },
  menuBarItem: {
    fontWeight: 600,
  },
  unselectedMenuBarItem: {
    background: 'white',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      border: 0,
    },
  },
  enabledScrollButton: {
    width: '40px',
    transition: 'all .5s',
  },
  disabledScrollButton: {
    width: '0',
    visibility: 'hidden',
    transition: 'all .5s',
  },
}));
