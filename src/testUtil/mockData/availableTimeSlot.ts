import { AvailableTimeSlot } from '../../interfaces/availableTimeSlot';

export function createMockAvailableTimeslot(startTime: string, endTime: string): AvailableTimeSlot {
  return { startTime, endTime };
}
