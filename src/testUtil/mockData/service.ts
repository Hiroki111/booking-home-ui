import { Service } from '../../interfaces/service';

const mockService: Service = {
  id: 1,
  name: 'Service 1',
  serviceTypeId: 1,
  minutes: 40,
  price: 35,
  tax: 5,
};

export function createMockService(params?: Partial<Service>) {
  return { ...mockService, ...params };
}
