import restApi from '../../network/restApi';
import { createMockAvailableDate } from '../../testUtil/mockData/availableDate';
import { createMockAvailableTimeslot } from '../../testUtil/mockData/availableTimeSlot';
import { createMockStaff } from '../../testUtil/mockData/staff';
import { findFirstAvailableStaff } from '../staff';

jest.mock('../../network/restApi', () => ({
  fetchStaffList: jest.fn(),
}));

describe('services/staff', () => {
  const timeslotA = createMockAvailableTimeslot('10:00', '10:30');
  const timeslotB = createMockAvailableTimeslot('10:30', '11:00');
  const timeslotC = createMockAvailableTimeslot('11:00', '11:30');
  const dateA = createMockAvailableDate({ id: 1, date: '2022-01-01', availableTimeSlots: [timeslotA, timeslotB] });
  const dateB = createMockAvailableDate({ id: 2, date: '2022-01-02', availableTimeSlots: [timeslotB, timeslotC] });
  const dateC = createMockAvailableDate({ id: 3, date: '2022-01-03', availableTimeSlots: [timeslotB, timeslotC] });
  const staffA = createMockStaff({ availableDates: [dateA, dateB] });
  const staffB = createMockStaff({ availableDates: [dateA] });
  const staffC = createMockStaff({ availableDates: [dateB] });
  const staffD = createMockStaff({ availableDates: [] });
  const allStaff = [staffA, staffB, staffC, staffD];

  describe('findFirstAvailableStaff', () => {
    it('should find the first available staff', () => {
      (restApi.fetchStaffList as jest.Mock).mockImplementation(() => allStaff);

      const firstAvailableStaff = findFirstAvailableStaff(allStaff, dateA, timeslotB);
      expect(firstAvailableStaff).toEqual(staffA);
    });

    it('should return undefined if no staff is available for the date and timeslot', () => {
      (restApi.fetchStaffList as jest.Mock).mockImplementation(() => allStaff);

      const firstAvailableStaff = findFirstAvailableStaff(allStaff, dateC, timeslotA);
      expect(firstAvailableStaff).toEqual(undefined);
    });
  });
});
