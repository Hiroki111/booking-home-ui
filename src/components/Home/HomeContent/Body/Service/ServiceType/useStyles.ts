import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '24px',
    scrollMarginTop: '190px',
  },
  step: {
    paddingBottom: '16px',
    letterSpacing: '0px',
    margin: '0px',
    minWidth: '0px',
    fontSize: '1.5rem',
    fontWeight: 800,
    lineHeight: '32px',
    color: 'rgb(16, 25, 40)',
    overflowWrap: 'break-word',
  },
  serviceItemsContainer: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
}));
