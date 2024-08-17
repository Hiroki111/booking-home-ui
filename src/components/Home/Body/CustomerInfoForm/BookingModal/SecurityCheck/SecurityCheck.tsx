import { TextField } from '@mui/material';

import { useStyles } from './useStyles';
import { useCaptchaQuery } from '../../../../../../queries/captcha';

interface Props {
  handleChangeCaptchaResponse: (e: React.ChangeEvent<HTMLInputElement>) => void;
  captchaResonse: string;
}

export function SecurityCheck({ handleChangeCaptchaResponse, captchaResonse }: Props) {
  const classes = useStyles();
  const fetchCaptchaQuery = useCaptchaQuery();
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
        {fetchCaptchaQuery.isFetching ? (
          <div className={classes.code}>Loading...</div>
        ) : (
          <div className={classes.code} dangerouslySetInnerHTML={{ __html: captchaChallenge }} />
        )}
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
