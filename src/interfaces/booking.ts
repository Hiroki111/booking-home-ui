export interface BookingRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  serviceIds: number[];
  totalPrice: number;
  staffId: number;
  date: string;
  startTime: string;
  endTime: string;
  staffAvailabilityId: number;
  captchaText: string;
}
