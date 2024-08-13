import { ServiceTypeDto } from '../../interfaces/serviceType';
import { createMockServiceDto } from './service';

const mockServiceType: ServiceTypeDto = {
  id: 1,
  name: 'Featured',
  services: [createMockServiceDto()],
};

export function createMockServiceTypeDto(params?: Partial<ServiceTypeDto>) {
  return { ...mockServiceType, ...params };
}
