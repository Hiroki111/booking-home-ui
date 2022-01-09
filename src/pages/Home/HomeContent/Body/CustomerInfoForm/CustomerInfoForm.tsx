import { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { flag } from 'country-emoji';

import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { BookingModal } from './BookingModal';
import { COUNTRY_PHONE_CODES, INITIAL_COUNTRY_FOR_PHONE_CODE } from '../../../../../staticData/countryPhoneCodes';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { getPathToSkippedPage } from '../../../../../services/routing';
import { useStyles } from './useStyles';

interface CountryPhoneCodeOption {
  countryAcronym: string;
  countryName: string;
  code: string;
}

const COUNTRY_PHONE_CODE_OPTIONS: CountryPhoneCodeOption[] = Object.entries(COUNTRY_PHONE_CODES).map(
  ([key, countryPhoneCode]) => ({
    countryAcronym: key,
    countryName: countryPhoneCode.name,
    code: countryPhoneCode.code,
  }),
);

const INITIAL_COUNTRY_PHONE_CODE =
  COUNTRY_PHONE_CODE_OPTIONS.find((option) => option.countryAcronym === INITIAL_COUNTRY_FOR_PHONE_CODE) ||
  ({} as CountryPhoneCodeOption);

export function CustomerInfoForm() {
  const classes = useStyles();
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(true);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showBookingConfirmationModal, setBookingConfirmationModal] = useState(false);
  const [selectedCountryPhoneCode, setSelectedCountryPhoneCode] = useState(INITIAL_COUNTRY_PHONE_CODE);
  const location = useLocation();
  const { customer, setCustomer, bookingCompletionState } = useHomePageContext();
  const pathToSkippedPage = getPathToSkippedPage(location.pathname, bookingCompletionState);

  useEffect(() => {
    if (customer.countryPhoneCode) return;

    setCustomer({
      ...customer,
      countryPhoneCode: INITIAL_COUNTRY_PHONE_CODE.code,
    });
  }, [customer, setCustomer, selectedCountryPhoneCode]);

  function handleChangeCountryPhoneCode(_e: React.ChangeEvent<{}>, newOption: CountryPhoneCodeOption | null) {
    if (!newOption) return;

    setSelectedCountryPhoneCode(newOption || ({} as CountryPhoneCodeOption));
    setCustomer({
      ...customer,
      countryPhoneCode: newOption?.code || '',
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBookingConfirmationModal(true);
  }

  if (pathToSkippedPage) {
    return <Redirect to={pathToSkippedPage} />;
  }

  return (
    <Paper className={classes.root} elevation={2}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          value={customer.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomer({ ...customer, firstName: e.target.value })}
          label="First name"
          variant="outlined"
          required
        />
        <TextField
          className={classes.textField}
          value={customer.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomer({ ...customer, lastName: e.target.value })}
          label="Last name"
          variant="outlined"
          required
        />
        <div className={clsx(classes.textField, classes.phoneNumberField)}>
          <Autocomplete
            className={classes.countryPhoneCode}
            value={selectedCountryPhoneCode}
            options={COUNTRY_PHONE_CODE_OPTIONS}
            getOptionLabel={(option: CountryPhoneCodeOption) =>
              `${option.countryAcronym || ''} ${flag(option.countryAcronym) || ''} ${option.code || ''}`
            }
            onChange={handleChangeCountryPhoneCode}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'none',
                }}
                label="Phone code"
                variant="outlined"
              />
            )}
          />
          <TextField
            className={classes.phoneNumber}
            value={customer.phoneNumber}
            type="phone"
            label="Phone number"
            variant="outlined"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCustomer({ ...customer, phoneNumber: e.target.value })
            }
          />
        </div>
        <TextField
          className={classes.textField}
          value={customer.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomer({ ...customer, email: e.target.value })}
          type="email"
          label="Email"
          variant="outlined"
          required
        />
        <p>
          <Checkbox
            checked={isPrivacyPolicyChecked}
            onChange={() => setIsPrivacyPolicyChecked(!isPrivacyPolicyChecked)}
            name="privacy-policy"
            color="primary"
            required
          />
          I agree to{' '}
          <span className={classes.privacyPolicy} onClick={() => setShowPrivacyPolicy(true)}>
            the privacy policy, website terms and booking terms
          </span>
        </p>
        <Button className={classes.textField} type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
      <PrivacyPolicyModal isOpen={showPrivacyPolicy} handleClose={() => setShowPrivacyPolicy(false)} />
      <BookingModal isOpen={showBookingConfirmationModal} handleClose={() => setBookingConfirmationModal(false)} />
    </Paper>
  );
}
