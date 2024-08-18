import dayjs from 'dayjs';
import { AvailableTimeSlot } from '../interfaces/availableTimeSlot';
import { Service } from '../interfaces/service';

export function filterTimeslotsByServices(timeslots: AvailableTimeSlot[], services: Service[]): AvailableTimeSlot[] {
  const totalMinutesRequired = services.reduce((totalMin: number, service) => totalMin + service.minutes, 0);

  return timeslots.filter((timeslot, i) => hasEnoughLengthOfTimeslots(timeslots, i, totalMinutesRequired, 0));
}

function hasEnoughLengthOfTimeslots(
  allTimeslots: AvailableTimeSlot[],
  currentTimeslotIndex: number,
  totalMinutesRequired: number,
  accumlatedTimeslotLength: number,
): boolean {
  const currentTimeslot = allTimeslots[currentTimeslotIndex];
  const start = dayjs(`2000-01-01 ${currentTimeslot.startTime}`);
  const end = dayjs(`2000-01-01 ${currentTimeslot.endTime}`);
  const length = end.diff(start, 'minute');

  if (totalMinutesRequired <= length + accumlatedTimeslotLength) {
    return true;
  }

  const nextTimeslot = allTimeslots[currentTimeslotIndex + 1];
  if (!nextTimeslot) {
    return false;
  }

  if (currentTimeslot.endTime !== nextTimeslot.startTime) {
    return false;
  }

  return hasEnoughLengthOfTimeslots(
    allTimeslots,
    currentTimeslotIndex + 1,
    totalMinutesRequired,
    length + accumlatedTimeslotLength,
  );
}
