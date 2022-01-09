import { ROUTES } from '../routes';
import { BookingCompletionState } from '../contexts/HomePageContext';

export function getPathToSkippedPage(
  currentPath: string,
  { HAS_SELECTED_SERVICES, HAS_SELECTED_STAFF, HAS_SELECTED_DATE, HAS_SELECTED_TIMESLOT }: BookingCompletionState,
) {
  if (!HAS_SELECTED_SERVICES && [ROUTES.staff, ROUTES.availability, ROUTES.customerInfoForm].includes(currentPath)) {
    return ROUTES.service;
  } else if (!HAS_SELECTED_STAFF && [ROUTES.availability, ROUTES.customerInfoForm].includes(currentPath)) {
    return ROUTES.staff;
  } else if (!HAS_SELECTED_DATE && [ROUTES.customerInfoForm].includes(currentPath)) {
    return ROUTES.availability;
  } else if (!HAS_SELECTED_TIMESLOT && [ROUTES.customerInfoForm].includes(currentPath)) {
    return ROUTES.availability;
  }
  return null;
}
