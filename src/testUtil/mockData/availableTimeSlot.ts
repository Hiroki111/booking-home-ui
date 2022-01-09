import { AvailableTimeSlotDto } from '../../interfaces/availableTimeSlot';

export function createMockAvailableTimeslot(startTime: string, endTime: string): AvailableTimeSlotDto {
  return { startTime, endTime };
}
