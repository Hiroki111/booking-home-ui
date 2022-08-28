import axios, { AxiosResponse } from 'axios';

import { AuthenticateResponseBodyDto } from '../interfaces/authenticate';
import { StaffDto } from '../interfaces/staff';
import { ServiceTypeDto } from '../interfaces/serviceType';
import { BookingRequestDto } from '../interfaces/booking';
import { BookingRequestError } from './error';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const restApi = {
  authenticate: function (email: string, password: string): Promise<AxiosResponse<AuthenticateResponseBodyDto>> {
    return axios({
      method: 'POST',
      url: '/api/auth/login',
      data: { email, password },
      headers: defaultHeaders,
    });
  },

  logout: function (): Promise<AxiosResponse<string>> {
    return axios({
      method: 'POST',
      url: '/api/auth/logout',
      headers: defaultHeaders,
    });
  },

  checkLoginStatus: function (): Promise<AxiosResponse<string>> {
    return axios({
      method: 'GET',
      url: '/api/auth/checkToken',
    });
  },

  fetchServiceTypes: async function (): Promise<ServiceTypeDto[]> {
    const res: AxiosResponse<ServiceTypeDto[]> = await axios({
      method: 'GET',
      url: '/api/serviceTypes',
    });
    return res.data;
  },

  fetchStaffList: async function (): Promise<StaffDto[]> {
    const res: AxiosResponse<StaffDto[]> = await axios({
      method: 'GET',
      url: '/api/staff',
    });
    return res.data;
  },

  fetchCaptcha: async function (): Promise<string> {
    const res: AxiosResponse<string> = await axios({
      method: 'GET',
      url: '/api/captcha',
      headers: defaultHeaders,
    });
    return res.data;
  },

  bookAppointment: async function (data: BookingRequestDto): Promise<void> {
    try {
      await axios({
        method: 'POST',
        url: '/api/bookings',
        data: data,
        headers: defaultHeaders,
      });
    } catch (error: any) {
      if (error.isAxiosError) {
        throw new BookingRequestError(
          error?.response?.data?.message || 'API request failed',
          error?.response?.data?.errorCode,
        );
      }
      throw error;
    }
  },
};

export default restApi;
