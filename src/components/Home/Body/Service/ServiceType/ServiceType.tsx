import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { ServicePanel } from '../ServicePanel';
import { useStyles } from './useStyles';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { Service } from '../../../../../interfaces/service';
import { ServiceType as ServiceTypeInterface } from '../../../../../interfaces/serviceType';
import { Staff } from '../../../../../interfaces/staff';

interface Props {
  serviceTypeRef: React.RefObject<any>;
  serviceType: ServiceTypeInterface;
  canAddMoreService: boolean;
  availableStaffList: Staff[];
}
export function ServiceType({ serviceTypeRef, serviceType, canAddMoreService, availableStaffList }: Props) {
  const classes = useStyles();
  const { selectedServices } = useHomePageContext();

  function isServiceSelected(service: Service): boolean {
    return selectedServices.some((selectedService) => selectedService.id === service.id);
  }

  return (
    <div className={classes.root} ref={serviceTypeRef}>
      <Typography component="p" className={classes.step}>
        {serviceType.name}
      </Typography>
      <Paper className={classes.serviceItemsContainer} elevation={2}>
        {serviceType.services.map((service: Service, serviceIndex: number) => (
          <ServicePanel
            service={service}
            isSelected={isServiceSelected(service)}
            canAddMoreService={canAddMoreService}
            isStaffAvailable={availableStaffList.length > 0}
            key={serviceIndex}
          />
        ))}
      </Paper>
    </div>
  );
}
