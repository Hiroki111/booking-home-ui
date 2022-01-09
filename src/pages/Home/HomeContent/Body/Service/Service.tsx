import { useEffect, createRef, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { Color } from '@material-ui/lab/Alert';

import { MenuBar } from './MenuBar';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { useServiceTypesQuery } from '../../../../../queries/serviceTypes';
import { useRegularStaffQuery } from '../../../../../queries/staff';
import { MAX_SERVICE_SELECTION_NUMBER } from '../../../../../staticData/service';
import { useIsSmallWindow } from '../../../../../hooks/window';
import { ServiceType } from './ServiceType';
import { useStyles } from './useStyles';

export const ALERT_TEXT_STAFF_UNAVAILABLE =
  'Due to the availability of staff, this service cannot be added. Please uncheck a selected service.';
export const ALERT_TEXT_SERVICE_SELECTION_LIMIT = `You can select up to ${MAX_SERVICE_SELECTION_NUMBER} services per appointment. To choose a different service, please uncheck a selected service.`;

export function Service() {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<Color | undefined>(undefined);
  const { serviceTypeRefs, selectedServices, setServiceTypeRefs } = useHomePageContext();
  const isSmallWindow = useIsSmallWindow();
  const serviceTypesQuery = useServiceTypesQuery();
  const availableStaffQuery = useRegularStaffQuery(selectedServices);

  const serviceTypes = serviceTypesQuery.data || [];
  const availableStaffList = availableStaffQuery.data || [];
  const canAddMoreService = MAX_SERVICE_SELECTION_NUMBER > selectedServices.length;

  useEffect(() => {
    setServiceTypeRefs((refs) =>
      Array(serviceTypes.length)
        .fill(null)
        .map((_, i) => refs[i] || createRef()),
    );
  }, [serviceTypes.length, setServiceTypeRefs]);

  useEffect(() => {
    if (!availableStaffQuery.isLoading && availableStaffList.length < 1) {
      setAlertType('error');
      setAlertMessage(ALERT_TEXT_STAFF_UNAVAILABLE);
    } else if (!canAddMoreService) {
      setAlertType('info');
      setAlertMessage(ALERT_TEXT_SERVICE_SELECTION_LIMIT);
    } else {
      setAlertType(undefined);
      setAlertMessage('');
    }
  }, [availableStaffList.length, canAddMoreService, availableStaffQuery.isLoading]);

  function handleCloseSnackbar() {
    setAlertMessage('');
  }

  if (!serviceTypes?.length) {
    return <p>No service is available at this moment</p>;
  }

  return (
    <>
      {!isSmallWindow && <MenuBar />}
      <div className={classes.serviceItemsRoot}>
        {serviceTypes.map((serviceType, i) => (
          <ServiceType
            key={i}
            serviceTypeRef={serviceTypeRefs[i]}
            serviceType={serviceType}
            canAddMoreService={canAddMoreService}
            availableStaffList={availableStaffList}
          />
        ))}
      </div>
      <Snackbar open={alertMessage.length > 0} autoHideDuration={10000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} elevation={6} variant="filled" severity={alertType}>
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
