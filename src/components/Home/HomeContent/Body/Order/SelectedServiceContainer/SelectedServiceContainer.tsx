import { ServiceDto } from '../../../../../../interfaces/service';
import { useStyles } from './useStyles';

interface Props {
  service: ServiceDto;
}

export function SelectedServiceContainer({ service }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.selectedServiceNameAndPrice}>
        <div>
          <p>{service.name}</p>
          <p className={classes.selectedServiceTime}>{`${service.minutes} min`}</p>
        </div>
        <div>
          <p className={classes.price}>{`€ ${service.price}`}</p>
        </div>
      </div>
    </div>
  );
}
