import { Customer } from '../../contexts/interfaces/customer';

const mockCustomer: Customer = {
  firstName: 'John',
  lastName: 'Doe',
  countryPhoneCode: '+123',
  phoneNumber: '000111222',
  email: 'test@mock.com',
};

export function createMockCustomer(params?: Partial<Customer>) {
  return { ...mockCustomer, ...params };
}
