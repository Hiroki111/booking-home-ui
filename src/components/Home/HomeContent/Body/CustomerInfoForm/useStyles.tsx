import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '8px',
    borderRadius: '8px',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      marginTop: '-48px',
      zIndex: 1200,
    },
  },
  textField: {
    margin: '8px',
    width: '97%',
  },
  privacyPolicy: {
    color: theme.palette.info.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.info.light,
    },
  },
  phoneNumberField: {
    display: 'flex',
    '& > div.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot': {
      paddingRight: 0,
    },
  },
  countryPhoneCode: {
    width: '210px',
  },
  phoneNumber: {
    width: 'calc(97% - 76px)',
    marginTop: '0px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
