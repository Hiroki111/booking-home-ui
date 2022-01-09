import { AvailableTimeSlotDto } from './availableTimeSlot';
import { ServiceDto } from './service';

export interface StaffDto {
  id: number;
  name: string;
  title?: string;
  profilePhotoUrl?: string;
  services: ServiceDto[];
  availableDates: AvailableDate[];
}

export interface NoPreferenceStaff extends Omit<StaffDto, 'availableDates' | 'services'> {
  availableDates: string[];
}

export interface AvailableDate {
  id: number;
  date: string;
  availableTimeSlots: AvailableTimeSlotDto[];
}
