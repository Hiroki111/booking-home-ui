import { useQuery, UseQueryResult } from '@tanstack/react-query';

import restApi from '../network/restApi';

export enum captchaQuries {
  fetchCaptcha = 'fetchCaptcha',
}

export function useCaptchaQuery(refetchOnWindowFocus: boolean = false): UseQueryResult<string> {
  return useQuery({
    queryKey: [captchaQuries.fetchCaptcha],
    queryFn: restApi.fetchCaptcha,
    refetchOnWindowFocus,
  });
}
