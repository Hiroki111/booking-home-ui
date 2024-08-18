import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ServiceTypeDto } from '../interfaces/serviceType';
import restApi from '../network/restApi';

export enum serviceTypesQuries {
  fetchServiceTypes = 'fetchServiceTypes',
}

export function useServiceTypesQuery(): UseQueryResult<ServiceTypeDto[]> {
  return useQuery({
    queryKey: [serviceTypesQuries.fetchServiceTypes],
    queryFn: restApi.fetchServiceTypes,
  });
}
