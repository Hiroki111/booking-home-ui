import { AvailableTimeSlotDto } from '../interfaces/availableTimeSlot';
import { ServiceDto } from '../interfaces/service';
import { AvailableDate, NoPreferenceStaff, StaffDto } from '../interfaces/staff';
import { NO_PREFERENCE_STAFF } from '../staticData/staff';

export function selectRegularStaffWhoCanDoAllServices(staffList: StaffDto[], services: ServiceDto[]): StaffDto[] {
  const serviceIds = services.map((service) => service.id) || [];
  return staffList.filter((staff: StaffDto) =>
    serviceIds.every((id: number) => staff.services?.map((service) => service.id).includes(id)),
  );
}
export function selectAllStaffWhoCanDoAllServices(
  staffList: StaffDto[],
  services: ServiceDto[],
): (NoPreferenceStaff | StaffDto)[] {
  const regularStaffList = selectRegularStaffWhoCanDoAllServices(staffList, services);

  if (regularStaffList.length <= 1) {
    return regularStaffList;
  }
  if (regularStaffList.length >= 2) {
    return [NO_PREFERENCE_STAFF, ...regularStaffList];
  }
  return regularStaffList;
}

export function findFirstAvailableStaff(
  staffList: StaffDto[],
  selectedDate: AvailableDate,
  timeSlot: AvailableTimeSlotDto,
): StaffDto | undefined {
  return staffList.find((staff: StaffDto) => {
    const date = staff.availableDates.find((availableDate) => availableDate.date === selectedDate.date);
    if (!date) {
      return false;
    }

    return date.availableTimeSlots.some((availableTimeslot) => availableTimeslot.startTime === timeSlot.startTime);
  });
}
