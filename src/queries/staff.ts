import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { NoPreferenceStaff, Staff } from '../interfaces/staff';
import { Service } from '../interfaces/service';
import restApi from '../network/restApi';
import { selectRegularStaffWhoCanDoAllServices, selectAllStaffWhoCanDoAllServices } from '../services/staff';

export enum staffQuries {
  fetchStaffList = 'fetchStaffList',
}

export function useStaffQuery(): UseQueryResult<Staff[]> {
  return useQuery({
    queryKey: [staffQuries.fetchStaffList],
    queryFn: restApi.fetchStaffList,
  });
}

export function useRegularStaffQuery(services: Service[]): UseQueryResult<Staff[]> {
  return useQuery({
    queryKey: [staffQuries.fetchStaffList],
    queryFn: restApi.fetchStaffList,
    select: (staffList: Staff[]) => selectRegularStaffWhoCanDoAllServices(staffList, services),
  });
}

export function useAllStaffQuery(services: Service[]): UseQueryResult<(NoPreferenceStaff | Staff)[]> {
  return useQuery({
    queryKey: [staffQuries.fetchStaffList],
    queryFn: restApi.fetchStaffList,
    select: (staffList: Staff[]) => selectAllStaffWhoCanDoAllServices(staffList, services),
  });
}
