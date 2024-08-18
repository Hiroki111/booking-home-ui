import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ServiceType } from '../interfaces/serviceType';
import restApi from '../network/restApi';

export enum serviceTypesQuries {
  fetchServiceTypes = 'fetchServiceTypes',
}

export function useServiceTypesQuery(): UseQueryResult<ServiceType[]> {
  return useQuery({
    queryKey: [serviceTypesQuries.fetchServiceTypes],
    queryFn: restApi.fetchServiceTypes,
  });
}
