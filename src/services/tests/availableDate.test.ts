import { createMockAvailableDate } from '../../testUtil/mockData/availableDate';
import { createMockServiceDto } from '../../testUtil/mockData/service';
import { createMockStaff } from '../../testUtil/mockData/staff';
import { getMapDateToAvailableDate, getMapDateToMaxAvailableDate } from '../availableDate';

describe('services/availableDate', () => {
  const service30Min = createMockServiceDto({ minutes: 30 });
  const service10Min = createMockServiceDto({ minutes: 10 });
  const service61Min = createMockServiceDto({ minutes: 61 });

  describe('getMapDateToAvailableDate', () => {
    const availableDateA = createMockAvailableDate({
      date: '2022-01-01',
      availableTimeSlots: [
        { startTime: '08:00', endTime: '08:30' },
        // "08:30" to "09:00" is absent
        { startTime: '09:00', endTime: '09:30' },
        { startTime: '09:30', endTime: '10:00' },
      ],
    });
    const staff = createMockStaff({
      services: [service30Min, service10Min, service61Min],
      availableDates: [availableDateA],
    });

    it('should get all the available timeslots that have at least 30 minutes', () => {
      const map = getMapDateToAvailableDate(staff, [service30Min]);

      expect(map).toEqual({
        '2022-01-01': {
          id: availableDateA.id,
          date: '2022-01-01',
          availableTimeSlots: [
            { startTime: '08:00', endTime: '08:30' },
            { startTime: '09:00', endTime: '09:30' },
            { startTime: '09:30', endTime: '10:00' },
          ],
        },
      });
    });

    it('should get all the available timeslots that have at least 40 minutes', () => {
      const map = getMapDateToAvailableDate(staff, [service30Min, service10Min]);

      expect(map).toEqual({
        '2022-01-01': {
          id: availableDateA.id,
          date: '2022-01-01',
          availableTimeSlots: [{ startTime: '09:00', endTime: '09:30' }],
        },
      });
    });

    it('should return an empty object if the selected staff does not have available timeslots for more than 60 minutes', () => {
      const map = getMapDateToAvailableDate(staff, [service61Min]);

      expect(map).toEqual({});
    });
  });

  describe('getMapDateToMaxAvailableDate', () => {
    const availableDateA = createMockAvailableDate({
      date: '2022-01-01',
      availableTimeSlots: [
        { startTime: '09:00', endTime: '09:30' },
        { startTime: '09:30', endTime: '10:00' },
        { startTime: '10:30', endTime: '11:00' },
      ],
    });
    const availableDateB = createMockAvailableDate({
      date: '2022-01-01',
      availableTimeSlots: [
        { startTime: '08:00', endTime: '08:30' },
        { startTime: '09:30', endTime: '10:00' }, // the above available date has the same timeslot on the same date
        { startTime: '11:00', endTime: '11:30' },
        { startTime: '11:30', endTime: '12:00' },
      ],
    });
    const availableDateC = createMockAvailableDate({
      date: '2022-01-02',
      availableTimeSlots: [{ startTime: '09:30', endTime: '10:00' }],
    });

    const staffA = createMockStaff({
      services: [service30Min, service10Min, service61Min],
      availableDates: [availableDateA],
    });
    const staffB = createMockStaff({
      services: [service30Min, service10Min, service61Min],
      availableDates: [availableDateB, availableDateC],
    });

    it('should get all the unique available timeslots in the ascending order that have at least 30 minutes', () => {
      const map = getMapDateToMaxAvailableDate([staffA, staffB], [service30Min]);

      expect(map).toEqual({
        '2022-01-01': {
          id: -1,
          date: '2022-01-01',
          availableTimeSlots: [
            { startTime: '08:00', endTime: '08:30' },
            { startTime: '09:00', endTime: '09:30' },
            { startTime: '09:30', endTime: '10:00' },
            { startTime: '10:30', endTime: '11:00' },
            { startTime: '11:00', endTime: '11:30' },
            { startTime: '11:30', endTime: '12:00' },
          ],
        },
        '2022-01-02': {
          id: -1,
          date: '2022-01-02',
          availableTimeSlots: [{ startTime: '09:30', endTime: '10:00' }],
        },
      });
    });

    it('should get all the unique available timeslots in the ascending order that have at least 40 minutes', () => {
      const map = getMapDateToMaxAvailableDate([staffA, staffB], [service30Min, service10Min]);

      expect(map).toEqual({
        '2022-01-01': {
          id: -1,
          date: '2022-01-01',
          availableTimeSlots: [
            { startTime: '09:00', endTime: '09:30' },
            { startTime: '11:00', endTime: '11:30' },
          ],
        },
      });
    });

    it('should return an empty object if the selected staff are not availble for the selected services', () => {
      const map = getMapDateToMaxAvailableDate([staffA, staffB], [service61Min]);

      expect(map).toEqual({});
    });
  });
});
