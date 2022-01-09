import { useState } from 'react';
import { Paper } from '@material-ui/core';

import { useStyles } from './useStyles';

export function BannerContainer() {
  const classes = useStyles();
  const [isImageInvalid, setIsImageInvalid] = useState(false);

  return (
    <>
      {!isImageInvalid && (
        <Paper square>
          <img className={classes.image} alt="_" src={'/banner.jpg'} onError={(e) => setIsImageInvalid(true)} />
        </Paper>
      )}
      <Paper elevation={2} className={classes.addressContainer} square>
        <p className={classes.name}>Sample Beauty Salon</p>
        <p className={classes.address}>1234 Street Dr. Vancouver</p>
        <p className={classes.address}>BC Canada</p>
      </Paper>
    </>
  );
}
