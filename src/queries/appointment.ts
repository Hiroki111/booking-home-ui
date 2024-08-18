import { useMutation } from '@tanstack/react-query';
import { BookingRequest } from '../interfaces/booking';

import restApi from '../network/restApi';

export enum appointmentQuries {
  createAppointment = 'createAppointment',
}

export function useCreateAppointmentMutation() {
  return useMutation({
    mutationFn: (appointmentPayload: BookingRequest) => restApi.bookAppointment(appointmentPayload),
  });
}
