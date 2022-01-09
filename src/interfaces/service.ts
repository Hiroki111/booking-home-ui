export interface ServiceDto {
  id: number;
  name: string;
  serviceTypeId: number;
  isSelected?: boolean; // this is used for UI
  minutes: number;
  price: number;
  tax: number;
}
