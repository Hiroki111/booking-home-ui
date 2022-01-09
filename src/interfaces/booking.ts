export interface BookingRequestDto {
  firstName: string;
  lastName: string;
  countryPhoneCode: string;
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
