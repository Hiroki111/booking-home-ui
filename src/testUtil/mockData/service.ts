import { ServiceDto } from '../../interfaces/service';

const mockServiceDto: ServiceDto = {
  id: 1,
  name: 'Service 1',
  serviceTypeId: 1,
  minutes: 40,
  price: 35,
  tax: 5,
};

export function createMockServiceDto(params?: Partial<ServiceDto>) {
  return { ...mockServiceDto, ...params };
}
