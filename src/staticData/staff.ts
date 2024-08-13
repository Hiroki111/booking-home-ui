import { NoPreferenceStaff } from '../interfaces/staff';

export const NO_PREFERENCE_STAFF: NoPreferenceStaff = {
  id: -1,
  name: 'No preference',
  title: 'Show the max availability, choose the first staff available',
  availableDates: [] as string[],
};
