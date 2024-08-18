export interface Service {
  id: number;
  name: string;
  serviceTypeId: number;
  // NOTE: this is probably redundant
  isSelected?: boolean;
  minutes: number;
  price: number;
  tax: number;
}
