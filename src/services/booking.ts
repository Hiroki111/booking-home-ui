import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Service } from '../interfaces/service';

dayjs.extend(customParseFormat);

export function calculateExpectedEndTime(startTime: string, services: Service[]): string {
  const totalMinutes = services.reduce((totalMinutes, service) => {
    return totalMinutes + service.minutes;
  }, 0);

  return dayjs(startTime, 'HH:mm').add(totalMinutes, 'minute').format('HH:mm');
}
