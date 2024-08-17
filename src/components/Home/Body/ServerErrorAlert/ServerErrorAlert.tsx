import { Alert, AlertTitle } from '@mui/lab';

export function ServerErrorAlert() {
  return (
    <Alert severity="error">
      <AlertTitle>
        <strong>Internal error occurred</strong>
      </AlertTitle>
      We'll be fixing the error shortly. Please refresh the browser later!
    </Alert>
  );
}
