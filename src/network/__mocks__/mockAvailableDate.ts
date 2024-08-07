import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const TIMESLOT_TIME_FORMAT = 'HH:mm';
const mockAvailableDates = [
  { date: '2023-12-17', start_time: '09:30', end_time: '16:00' },
  { date: '2023-12-27', start_time: '09:30', end_time: '16:00' },
  { date: '2024-01-01', start_time: '10:30', end_time: '18:00' },
  { date: '2024-01-02', start_time: '09:00', end_time: '18:00' },
  { date: '2024-01-03', start_time: '10:00', end_time: '16:00' },
  { date: '2024-01-05', start_time: '09:00', end_time: '16:00' },
  { date: '2024-01-15', start_time: '10:00', end_time: '16:30' },
  { date: '2024-01-20', start_time: '10:30', end_time: '17:30' },
  { date: '2024-01-21', start_time: '10:00', end_time: '17:30' },
  { date: '2024-01-25', start_time: '09:00', end_time: '17:00' },
  { date: '2024-01-27', start_time: '09:30', end_time: '17:00' },
  { date: '2024-02-05', start_time: '09:00', end_time: '17:30' },
  { date: '2024-02-06', start_time: '09:30', end_time: '16:30' },
  { date: '2024-02-08', start_time: '09:00', end_time: '16:00' },
  { date: '2024-02-09', start_time: '09:30', end_time: '18:00' },
  { date: '2024-02-10', start_time: '09:00', end_time: '18:30' },
  { date: '2024-02-11', start_time: '09:30', end_time: '18:00' },
  { date: '2024-02-15', start_time: '09:00', end_time: '17:00' },
  { date: '2024-02-17', start_time: '09:30', end_time: '17:30' },
  { date: '2024-02-20', start_time: '09:00', end_time: '17:30' },
  { date: '2024-02-21', start_time: '10:00', end_time: '16:30' },
  { date: '2024-02-25', start_time: '09:00', end_time: '16:00' },
  { date: '2024-02-27', start_time: '09:30', end_time: '16:00' },
  { date: '2024-03-01', start_time: '10:30', end_time: '18:00' },
  { date: '2024-03-02', start_time: '09:00', end_time: '18:00' },
  { date: '2024-03-03', start_time: '10:00', end_time: '16:00' },
  { date: '2024-03-05', start_time: '09:00', end_time: '16:00' },
  { date: '2024-03-15', start_time: '10:00', end_time: '16:30' },
  { date: '2024-03-20', start_time: '10:30', end_time: '17:30' },
  { date: '2024-03-21', start_time: '10:00', end_time: '17:30' },
  { date: '2024-03-25', start_time: '09:00', end_time: '17:00' },
  { date: '2024-03-27', start_time: '09:30', end_time: '17:00' },
  { date: '2024-04-05', start_time: '09:00', end_time: '17:30' },
  { date: '2024-04-06', start_time: '09:30', end_time: '16:30' },
  { date: '2024-04-08', start_time: '09:00', end_time: '16:00' },
  { date: '2024-04-09', start_time: '09:30', end_time: '18:00' },
  { date: '2024-04-10', start_time: '09:00', end_time: '18:30' },
  { date: '2024-04-11', start_time: '09:30', end_time: '18:00' },
  { date: '2024-04-15', start_time: '09:00', end_time: '17:00' },
  { date: '2024-04-17', start_time: '09:30', end_time: '17:30' },
  { date: '2024-04-20', start_time: '09:00', end_time: '17:30' },
  { date: '2024-04-21', start_time: '10:00', end_time: '16:30' },
  { date: '2024-04-25', start_time: '09:00', end_time: '16:00' },
  { date: '2024-04-27', start_time: '09:30', end_time: '16:00' },
  { date: '2024-05-05', start_time: '09:00', end_time: '17:30' },
  { date: '2024-05-06', start_time: '09:30', end_time: '16:30' },
  { date: '2024-05-08', start_time: '09:00', end_time: '16:00' },
  { date: '2024-05-09', start_time: '09:30', end_time: '18:00' },
  { date: '2024-05-10', start_time: '09:00', end_time: '18:30' },
  { date: '2024-05-11', start_time: '09:30', end_time: '18:00' },
  { date: '2024-05-15', start_time: '09:00', end_time: '17:00' },
  { date: '2024-05-17', start_time: '09:30', end_time: '17:30' },
  { date: '2024-05-20', start_time: '09:00', end_time: '17:30' },
  { date: '2024-05-21', start_time: '10:00', end_time: '16:30' },
  { date: '2024-05-25', start_time: '09:00', end_time: '16:00' },
  { date: '2024-05-27', start_time: '09:30', end_time: '16:00' },
  { date: '2024-06-01', start_time: '10:30', end_time: '18:00' },
  { date: '2024-06-02', start_time: '09:00', end_time: '18:00' },
  { date: '2024-06-03', start_time: '10:00', end_time: '16:00' },
  { date: '2024-06-05', start_time: '09:00', end_time: '16:00' },
  { date: '2024-06-15', start_time: '10:00', end_time: '16:30' },
  { date: '2024-06-20', start_time: '10:30', end_time: '17:30' },
  { date: '2024-06-21', start_time: '10:00', end_time: '17:30' },
  { date: '2024-06-25', start_time: '09:00', end_time: '17:00' },
  { date: '2024-06-27', start_time: '09:30', end_time: '17:00' },
  { date: '2024-07-05', start_time: '09:00', end_time: '17:30' },
  { date: '2024-07-06', start_time: '09:30', end_time: '16:30' },
  { date: '2024-07-08', start_time: '09:00', end_time: '16:00' },
  { date: '2024-07-09', start_time: '09:30', end_time: '18:00' },
  { date: '2024-07-10', start_time: '09:00', end_time: '18:30' },
  { date: '2024-07-11', start_time: '09:30', end_time: '18:00' },
  { date: '2024-07-15', start_time: '09:00', end_time: '17:00' },
  { date: '2024-07-17', start_time: '09:30', end_time: '17:30' },
  { date: '2024-07-20', start_time: '09:00', end_time: '17:30' },
  { date: '2024-07-21', start_time: '10:00', end_time: '16:30' },
  { date: '2024-07-25', start_time: '09:00', end_time: '16:00' },
  { date: '2024-07-27', start_time: '09:30', end_time: '16:00' },
  { date: '2024-08-01', start_time: '10:30', end_time: '18:00' },
  { date: '2024-08-02', start_time: '09:00', end_time: '18:00' },
  { date: '2024-08-03', start_time: '10:00', end_time: '16:00' },
  { date: '2024-08-05', start_time: '09:00', end_time: '16:00' },
  { date: '2024-08-15', start_time: '10:00', end_time: '16:30' },
  { date: '2024-08-20', start_time: '10:30', end_time: '17:30' },
  { date: '2024-08-21', start_time: '10:00', end_time: '17:30' },
  { date: '2024-08-25', start_time: '09:00', end_time: '17:00' },
  { date: '2024-08-27', start_time: '09:30', end_time: '17:00' },
  { date: '2024-09-05', start_time: '09:00', end_time: '17:30' },
  { date: '2024-09-06', start_time: '09:30', end_time: '16:30' },
  { date: '2024-09-08', start_time: '09:00', end_time: '16:00' },
  { date: '2024-09-09', start_time: '09:30', end_time: '18:00' },
  { date: '2024-09-10', start_time: '09:00', end_time: '18:30' },
  { date: '2024-09-11', start_time: '09:30', end_time: '18:00' },
  { date: '2024-09-15', start_time: '09:00', end_time: '17:00' },
  { date: '2024-09-17', start_time: '09:30', end_time: '17:30' },
  { date: '2024-09-20', start_time: '09:00', end_time: '17:30' },
  { date: '2024-09-21', start_time: '10:00', end_time: '16:30' },
  { date: '2024-09-25', start_time: '09:00', end_time: '16:00' },
  { date: '2024-09-27', start_time: '09:30', end_time: '16:00' },
  { date: '2024-10-01', start_time: '10:30', end_time: '18:00' },
  { date: '2024-10-02', start_time: '09:00', end_time: '18:00' },
  { date: '2024-10-03', start_time: '10:00', end_time: '16:00' },
  { date: '2024-10-05', start_time: '09:00', end_time: '16:00' },
  { date: '2024-10-15', start_time: '10:00', end_time: '16:30' },
  { date: '2024-10-20', start_time: '10:30', end_time: '17:30' },
  { date: '2024-10-21', start_time: '10:00', end_time: '17:30' },
  { date: '2024-10-25', start_time: '09:00', end_time: '17:00' },
  { date: '2024-10-27', start_time: '09:30', end_time: '17:00' },
  { date: '2024-11-05', start_time: '09:00', end_time: '17:30' },
  { date: '2024-11-06', start_time: '09:30', end_time: '16:30' },
  { date: '2024-11-08', start_time: '09:00', end_time: '16:00' },
  { date: '2024-11-09', start_time: '09:30', end_time: '18:00' },
  { date: '2024-11-10', start_time: '09:00', end_time: '18:30' },
  { date: '2024-11-11', start_time: '09:30', end_time: '18:00' },
  { date: '2024-11-15', start_time: '09:00', end_time: '17:00' },
  { date: '2024-11-17', start_time: '09:30', end_time: '17:30' },
  { date: '2024-11-20', start_time: '09:00', end_time: '17:30' },
  { date: '2024-11-21', start_time: '10:00', end_time: '16:30' },
  { date: '2024-11-25', start_time: '09:00', end_time: '16:00' },
  { date: '2024-11-27', start_time: '09:30', end_time: '16:00' },
  { date: '2024-12-05', start_time: '09:00', end_time: '17:30' },
  { date: '2024-12-06', start_time: '09:30', end_time: '16:30' },
  { date: '2024-12-08', start_time: '09:00', end_time: '16:00' },
  { date: '2024-12-09', start_time: '09:30', end_time: '18:00' },
  { date: '2024-12-10', start_time: '09:00', end_time: '18:30' },
  { date: '2024-12-11', start_time: '09:30', end_time: '18:00' },
  { date: '2024-12-15', start_time: '09:00', end_time: '17:00' },
  { date: '2024-12-17', start_time: '09:30', end_time: '17:30' },
  { date: '2024-12-20', start_time: '09:00', end_time: '17:30' },
  { date: '2024-12-21', start_time: '10:00', end_time: '16:30' },
  { date: '2024-12-25', start_time: '09:00', end_time: '16:00' },
  { date: '2024-12-27', start_time: '09:30', end_time: '16:00' },
];

export function getMockAvailableDates() {
  return mockAvailableDates
    .filter((availableDate) => {
      const currentDate = dayjs();
      const dateToCompare = dayjs(availableDate.date, 'YYYY-MM-DD');
      return dateToCompare.isAfter(currentDate);
    })
    .map((availableDate, i) => ({
      id: i,
      date: availableDate.date,
      availableTimeSlots: getAvailableTimeslots(availableDate.start_time, availableDate.end_time),
    }));
}

export function getAvailableTimeslots(startTime: string, endTime: string) {
  const availableTimeslots: {
    startTime: string;
    endTime: string;
  }[] = [];
  let startTimeOfTimeslot = startTime;

  while (startTimeOfTimeslot < endTime) {
    const endTimeOfTimeslot = dayjs(startTimeOfTimeslot, TIMESLOT_TIME_FORMAT)
      .add(30, 'minute')
      .format(TIMESLOT_TIME_FORMAT);
    const timeslot = { startTime: startTimeOfTimeslot, endTime: endTimeOfTimeslot };
    availableTimeslots.push(timeslot);

    startTimeOfTimeslot = endTimeOfTimeslot;
  }
  return availableTimeslots;
}
