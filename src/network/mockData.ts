import { AvailableTimeSlotDto } from '../interfaces/availableTimeSlot';
import { AvailableDate, StaffDto } from '../interfaces/staff';

// no one can do service 18
// service 19 doesn't exist
export const staffList = [
  {
    id: -1,
    name: 'No preference',
    title: 'Maximum availability',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
      {
        date: '2021-09-15',
        availableTimeSlots: [
          { startTime: '09:30' },
          { startTime: '13:30' },
          { startTime: '13:45' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 1,
    name: 'Cooper Adcock',
    title: 'Senior Colorist',
    profilePhotoUrl:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--H4p1KR_4--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/418876/293e9eaa-92fc-44d3-9705-67f74f20608d.jpeg',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
      {
        date: '2021-09-15',
        availableTimeSlots: [
          { startTime: '09:30' },
          { startTime: '13:30' },
          { startTime: '13:45' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 2,
    name: 'Lucian Peel',
    title: 'Hair Stylist',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '13:30' },
          { startTime: '14:15' },
          { startTime: '15:00' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 3,
    name: 'Cohen Teel',
    title: 'Senior Hair Stylist',
    profilePhotoUrl: 'invalid-path',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 4,
    name: 'Jayna Wilcox',
    title: 'Hair Stylist',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 5,
    name: 'Carey Low',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 6,
    name: 'Blossom Gabriels',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 7,
    name: 'Zanna Millhouse',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 8,
    name: 'Davis Lovell',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 9,
    name: 'Conor Dane',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
  {
    id: 10,
    name: 'Dianna Haines',
    title: 'Senior Hair Stylist',
    availableDates: [
      {
        date: '2021-09-13',
        availableTimeSlots: [
          { startTime: '09:00' },
          { startTime: '09:15' },
          { startTime: '09:30' },
          { startTime: '13:00' },
          { startTime: '13:30' },
          { startTime: '13:45' },
          { startTime: '15:15' },
        ] as AvailableTimeSlotDto[],
      },
    ] as AvailableDate[],
  },
] as StaffDto[];
