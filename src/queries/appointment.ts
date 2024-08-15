import { useMutation } from 'react-query';
import { BookingRequestDto } from '../interfaces/booking';

import restApi from '../network/restApi';

export enum appointmentQuries {
  createAppointment = 'createAppointment',
}

export function useCreateAppointmentMutation() {
  return useMutation(appointmentQuries.createAppointment, (appointmentPayload: BookingRequestDto) =>
    restApi.bookAppointment(appointmentPayload),
  );
}
