import { ServiceType } from '../../interfaces/serviceType';
import { createMockService } from './service';

const mockServiceType: ServiceType = {
  id: 1,
  name: 'Featured',
  services: [createMockService()],
};

export function createMockServiceType(params?: Partial<ServiceType>) {
  return { ...mockServiceType, ...params };
}
