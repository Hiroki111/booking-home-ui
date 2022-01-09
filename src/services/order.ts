import { ServiceDto } from '../interfaces/service';
import { Order } from '../contexts/interfaces/order';

export const defaultOrder = {
  totalPrice: 0,
  tax: 0,
};

export function calculateOrder(selectedServices: ServiceDto[]): Order {
  if (!selectedServices.length) {
    return defaultOrder;
  }

  return {
    totalPrice: selectedServices.reduce((totalPrice, service) => totalPrice + service.price, 0),
    tax: selectedServices.reduce((tax, service) => tax + service.tax, 0),
  };
}
