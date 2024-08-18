import { AvailableTimeSlot } from '../../interfaces/availableTimeSlot';
import { Service } from '../../interfaces/service';
import { filterTimeslotsByServices } from '../timeslot';

describe('services/timeslot', () => {
  describe('filterTimeslotsByServices', () => {
    const timeslots = [
      { startTime: '14:00', endTime: '14:30' },
      { startTime: '14:30', endTime: '15:00' },
      // "15:00" to "15:30" is absent
      { startTime: '15:30', endTime: '16:00' },
      { startTime: '16:00', endTime: '16:30' },
    ] as AvailableTimeSlot[];

    it('should filter timeslots', () => {
      const servicesA = [{ minutes: 10 }, { minutes: 30 }] as Service[];
      const servicesB = [{ minutes: 10 }, { minutes: 30 }, { minutes: 60 }] as Service[];
      const servicesC = [{ minutes: 10 }] as Service[];

      const availableTimeslotsA = filterTimeslotsByServices(timeslots, servicesA);
      const availableTimeslotsB = filterTimeslotsByServices(timeslots, servicesB);
      const availableTimeslotsC = filterTimeslotsByServices(timeslots, servicesC);

      expect(availableTimeslotsA).toEqual([
        { startTime: '14:00', endTime: '14:30' },
        { startTime: '15:30', endTime: '16:00' },
      ]);
      expect(availableTimeslotsB).toEqual([]);
      expect(availableTimeslotsC).toEqual([
        { startTime: '14:00', endTime: '14:30' },
        { startTime: '14:30', endTime: '15:00' },
        { startTime: '15:30', endTime: '16:00' },
        { startTime: '16:00', endTime: '16:30' },
      ]);
    });

    it('should filter timeslots with an empty sevice list', () => {
      const services = [] as Service[];
      const availableTimeslots = filterTimeslotsByServices(timeslots, services);

      expect(availableTimeslots).toEqual([
        { startTime: '14:00', endTime: '14:30' },
        { startTime: '14:30', endTime: '15:00' },
        { startTime: '15:30', endTime: '16:00' },
        { startTime: '16:00', endTime: '16:30' },
      ]);
    });

    it('should return an empty array if there is no timeslot', () => {
      const services = [{ minutes: 10 }] as Service[];
      const availableTimeslots = filterTimeslotsByServices([], services);

      expect(availableTimeslots).toEqual([]);
    });
  });
});
