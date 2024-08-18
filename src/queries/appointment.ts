import { useMutation } from '@tanstack/react-query';
import { BookingRequestDto } from '../interfaces/booking';

import restApi from '../network/restApi';

export enum appointmentQuries {
  createAppointment = 'createAppointment',
}

export function useCreateAppointmentMutation() {
  return useMutation({
    mutationFn: (appointmentPayload: BookingRequestDto) => restApi.bookAppointment(appointmentPayload),
  });
}
