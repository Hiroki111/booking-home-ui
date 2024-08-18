import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { ServicePanel } from '../ServicePanel';
import { useStyles } from './useStyles';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { ServiceDto } from '../../../../../interfaces/service';
import { ServiceTypeDto } from '../../../../../interfaces/serviceType';
import { StaffDto } from '../../../../../interfaces/staff';

interface Props {
  serviceTypeRef: React.RefObject<any>;
  serviceType: ServiceTypeDto;
  canAddMoreService: boolean;
  availableStaffList: StaffDto[];
}
export function ServiceType({ serviceTypeRef, serviceType, canAddMoreService, availableStaffList }: Props) {
  const classes = useStyles();
  const { selectedServices } = useHomePageContext();

  function isServiceSelected(service: ServiceDto): boolean {
    return selectedServices.some((selectedService) => selectedService.id === service.id);
  }

  return (
    <div className={classes.root} ref={serviceTypeRef}>
      <Typography component="p" className={classes.step}>
        {serviceType.name}
      </Typography>
      <Paper className={classes.serviceItemsContainer} elevation={2}>
        {serviceType.services.map((service: ServiceDto, serviceIndex: number) => (
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
