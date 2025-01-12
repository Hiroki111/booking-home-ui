import { useState } from 'react';
import clsx from 'clsx';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';

import { useStyles } from './useStyles';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { Service } from '../../../../../interfaces/service';

export interface Props {
  service: Service;
  isSelected: boolean;
  canAddMoreService: boolean;
  isStaffAvailable: boolean;
}

export function ServicePanel({ service, isSelected, canAddMoreService, isStaffAvailable }: Props) {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState<boolean>(isSelected);
  const { selectedServices, setSelectedServices } = useHomePageContext();
  const isDisabled = !canAddMoreService || !isStaffAvailable;

  function handleOnClick() {
    const checked = !isChecked;

    if (checked && !isStaffAvailable) {
      return;
    } else if (checked && !canAddMoreService) {
      return;
    }

    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter((selectedService) => selectedService.id !== service.id));
    }
    setIsChecked(checked);
  }

  return (
    <Paper key={service.id} elevation={2} square onClick={handleOnClick} className={classes.root}>
      <div className={classes.serviceItems}>
        <div className={classes.serviceItemCheckBox}>
          <Checkbox
            data-testid="service-check-box"
            color="primary"
            checked={isChecked}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleCheckedFilled className={classes.checkedServiceItem} />}
          />
        </div>
        <div className={classes.serviceItemDetails}>
          <div>
            <p className={clsx(classes.serviceBold, isDisabled && classes.disabled)}>{service.name}</p>
            <p className={classes.serviceLight}>{`${service.minutes} min`}</p>
          </div>
          <div>
            <p
              className={clsx(classes.serviceBold, classes.price, isDisabled && classes.disabled)}
            >{`€ ${service.price}`}</p>
          </div>
        </div>
      </div>
    </Paper>
  );
}
