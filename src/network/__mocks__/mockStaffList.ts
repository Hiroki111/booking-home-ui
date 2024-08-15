import { StaffDto } from '../../interfaces/staff';
import { createMockStaff } from '../../testUtil/mockData/staff';
import { getServices } from './mockServiceDto';
import { getMockAvailableDates } from './mockAvailableDate';

export const mockStaffList: StaffDto[] = [
  createMockStaff({
    id: 1,
    name: 'Barak Obama',
    title: 'Senior Colorist',
    profilePhotoUrl:
      'https://res.cloudinary.com/dcjbbvpyz/image/upload/v1668875857/hiroki-booking/staff-avatar/1-v18ZYD.jpg',
    services: getServices([1, 2, 3, 9, 10, 11]),
    availableDates: getMockAvailableDates(),
  }),
  createMockStaff({
    id: 2,
    name: 'Fake Avatar',
    title: 'Hair Stylist',
    services: getServices([7, 13, 14, 15, 16]),
    availableDates: getMockAvailableDates(),
  }),
  createMockStaff({
    id: 3,
    name: 'Cohen Teel',
    title: 'Senior Hair Stylist',
    services: getServices([1, 2, 3, 4, 12, 14, 15]),
    availableDates: getMockAvailableDates(),
  }),
  createMockStaff({
    id: 4,
    name: 'Jayna Wilcox',
    title: 'Hair Stylist',
    services: getServices([1, 2, 4, 5, 6, 7]),
    availableDates: getMockAvailableDates(),
  }),
  createMockStaff({
    id: 5,
    name: 'Carey Low',
    services: getServices([1, 2, 4, 5, 10, 11, 12, 13, 14]),
    availableDates: getMockAvailableDates(),
  }),
  createMockStaff({
    id: 6,
    name: 'Blossom Gabriels',
    services: getServices([3, 4, 8, 9, 10, 15]),
    availableDates: getMockAvailableDates(),
  }),
  createMockStaff({
    id: 7,
    name: 'Zanna Millhouse',
    services: getServices([1, 2, 3, 4, 5, 6]),
    availableDates: getMockAvailableDates(),
  }),
  createMockStaff({
    id: 8,
    name: 'Davis Lovell',
    services: getServices([1, 9, 10, 11]),
    availableDates: getMockAvailableDates(),
  }),
  createMockStaff({
    id: 9,
    name: 'Conor Dane',
    services: getServices([1, 2, 5, 6, 7, 16, 17]),
    availableDates: getMockAvailableDates(),
  }),
  createMockStaff({
    id: 10,
    name: 'Dianna Haines',
    title: 'Senior Hair Stylist',
    services: getServices([2, 3, 6, 7, 14, 15, 16, 12, 17]),
    availableDates: getMockAvailableDates(),
  }),
];
