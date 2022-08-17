import { TextField } from '@material-ui/core';
import { UseQueryOptions } from 'react-query';

import { useCaptchaQuery } from '../../../../../../../queries/captcha';
import { useStyles } from './useStyles';

interface Props {
  handleChangeCaptchaResponse: (e: React.ChangeEvent<HTMLInputElement>) => void;
  captchaResonse: string;
}

export function SecurityCheck({ handleChangeCaptchaResponse, captchaResonse }: Props) {
  const classes = useStyles();
  const fetchCaptchaQuery = useCaptchaQuery({
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
  const captchaChallenge = fetchCaptchaQuery.data || '';

  return (
    <div>
      <h3>Security Check</h3>
      <p>Please enter the following code in the box below</p>
      <p>
        (
        <span className={classes.refreshCode} onClick={() => fetchCaptchaQuery.refetch()}>
          Click here
        </span>{' '}
        to refresh the code)
      </p>
      <div className={classes.captchaWrapper}>
        <div dangerouslySetInnerHTML={{ __html: captchaChallenge }} />
        <TextField
          variant="outlined"
          value={captchaResonse}
          placeholder={'Enter...'}
          onChange={handleChangeCaptchaResponse}
        />
      </div>
    </div>
  );
}
