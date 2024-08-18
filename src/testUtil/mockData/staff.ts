import { Staff } from '../../interfaces/staff';
import { createMockAvailableDate } from './availableDate';
import { createMockService } from './service';

const mockStaff: Staff = {
  id: 1,
  name: 'John Smith',
  services: [createMockService()],
  availableDates: [createMockAvailableDate()],
};

export function createMockStaff(params?: Partial<Staff>) {
  return { ...mockStaff, ...params };
}
