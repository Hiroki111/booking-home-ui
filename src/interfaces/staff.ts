import { AvailableTimeSlot } from './availableTimeSlot';
import { Service } from './service';

export interface Staff {
  id: number;
  name: string;
  title?: string;
  profilePhotoUrl?: string;
  services: Service[];
  availableDates: AvailableDate[];
}

export interface NoPreferenceStaff extends Omit<Staff, 'availableDates' | 'services'> {
  availableDates: string[];
}

export interface AvailableDate {
  id: number;
  date: string;
  availableTimeSlots: AvailableTimeSlot[];
}
