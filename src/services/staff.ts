import { AvailableTimeSlot } from '../interfaces/availableTimeSlot';
import { Service } from '../interfaces/service';
import { AvailableDate, NoPreferenceStaff, Staff } from '../interfaces/staff';
import { NO_PREFERENCE_STAFF } from '../staticData/staff';

export function selectRegularStaffWhoCanDoAllServices(staffList: Staff[], services: Service[]): Staff[] {
  const serviceIds = services.map((service) => service.id) || [];
  return staffList.filter((staff: Staff) =>
    serviceIds.every((id: number) => staff.services?.map((service) => service.id).includes(id)),
  );
}
export function selectAllStaffWhoCanDoAllServices(
  staffList: Staff[],
  services: Service[],
): (NoPreferenceStaff | Staff)[] {
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
  staffList: Staff[],
  selectedDate: AvailableDate,
  timeSlot: AvailableTimeSlot,
): Staff | undefined {
  return staffList.find((staff: Staff) => {
    const date = staff.availableDates.find((availableDate) => availableDate.date === selectedDate.date);
    if (!date) {
      return false;
    }

    return date.availableTimeSlots.some((availableTimeslot) => availableTimeslot.startTime === timeSlot.startTime);
  });
}
