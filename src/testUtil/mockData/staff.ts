import { StaffDto } from '../../interfaces/staff';
import { createMockAvailableDate } from './availableDate';
import { createMockServiceDto } from './service';

const mockStaff: StaffDto = {
  id: 1,
  name: 'John Smith',
  services: [createMockServiceDto()],
  availableDates: [createMockAvailableDate()],
};

export function createMockStaff(params?: Partial<StaffDto>) {
  return { ...mockStaff, ...params };
}
