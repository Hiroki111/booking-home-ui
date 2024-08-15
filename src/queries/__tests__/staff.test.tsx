import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { NO_PREFERENCE_STAFF } from '../../staticData/staff';
import { createMockServiceDto } from '../../testUtil/mockData/service';
import { createMockStaff } from '../../testUtil/mockData/staff';
import { useAllStaffQuery, useRegularStaffQuery } from '../staff';
import { ReactNode } from 'react';

jest.mock('../../network/restApi', () => ({
  fetchStaffList: jest.fn(),
}));

describe('queries/staff', () => {
  const restApi = require('../../network/restApi');
  const serviceA = createMockServiceDto({ id: 1 });
  const serviceB = createMockServiceDto({ id: 2 });
  const serviceC = createMockServiceDto({ id: 3 });
  const serviceZ = createMockServiceDto({ id: 100 });

  function wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
  }

  describe('useRegularStaffQuery', () => {
    it('should get all the regular staff who can do all the selected services', async () => {
      const staffA = createMockStaff({ services: [serviceA, serviceB, serviceC] });
      const staffB = createMockStaff({ services: [serviceA, serviceB] });
      const staffC = createMockStaff({ services: [serviceA] });
      const staffD = createMockStaff({ services: [] });
      restApi.fetchStaffList.mockImplementation(() => [staffA, staffB, staffC, staffD]);

      let { result } = renderHook(() => useRegularStaffQuery([serviceA, serviceB, serviceC]), { wrapper });
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual([staffA]);

      ({ result } = renderHook(() => useRegularStaffQuery([]), { wrapper }));
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual([staffA, staffB, staffC, staffD]);

      ({ result } = renderHook(() => useRegularStaffQuery([serviceZ]), { wrapper }));
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual([]);
    });
  });

  describe('useAllStaffQuery', () => {
    it('should get all the staff who can do all the selected services', async () => {
      const staffA = createMockStaff({ services: [serviceA, serviceB, serviceC] });
      const staffB = createMockStaff({ services: [serviceA, serviceB] });
      const staffC = createMockStaff({ services: [serviceA] });
      const staffD = createMockStaff({ services: [] });

      restApi.fetchStaffList.mockImplementation(() => [staffA, staffB, staffC, staffD]);

      let { result } = renderHook(() => useAllStaffQuery([serviceA, serviceB, serviceC]), { wrapper });
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual([staffA]);

      // noPreferenceStaff is returned only if there are 2 or more regular staff
      ({ result } = renderHook(() => useAllStaffQuery([serviceA, serviceB]), { wrapper }));
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual([NO_PREFERENCE_STAFF, staffA, staffB]);

      ({ result } = renderHook(() => useAllStaffQuery([]), { wrapper }));
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual([NO_PREFERENCE_STAFF, staffA, staffB, staffC, staffD]);

      ({ result } = renderHook(() => useAllStaffQuery([serviceZ]), { wrapper }));
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual([]);
    });
  });
});
