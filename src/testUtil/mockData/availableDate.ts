import { AvailableDate } from '../../interfaces/staff';

const mockAvailableDate: AvailableDate = {
  id: 1,
  date: '2022-01-31',
  availableTimeSlots: [{ startTime: '10:00', endTime: '10:30' }],
};

export function createMockAvailableDate(params?: Partial<AvailableDate>) {
  return { ...mockAvailableDate, ...params };
}
