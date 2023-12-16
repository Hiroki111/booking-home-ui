import axios, { AxiosResponse } from 'axios';

import { AuthenticateResponseBodyDto } from '../interfaces/authenticate';
import { StaffDto } from '../interfaces/staff';
import { ServiceTypeDto } from '../interfaces/serviceType';
import { BookingRequestDto } from '../interfaces/booking';
import { mockServiceTypeDtos } from './__mocks__/mockServiceTypeDto';
import { mockStaffList } from './__mocks__/mockStaffList';
import { BookingRequestError } from './error';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const restApi = {
  // NOTE: it's not used
  authenticate: function (email: string, password: string): Promise<AxiosResponse<AuthenticateResponseBodyDto>> {
    return axios({
      method: 'POST',
      url: '/api/auth/login',
      data: { email, password },
      headers: defaultHeaders,
    });
  },

  // NOTE: it's not used
  logout: function (): Promise<AxiosResponse<string>> {
    return axios({
      method: 'POST',
      url: '/api/auth/logout',
      headers: defaultHeaders,
    });
  },

  // NOTE: it's not used
  checkLoginStatus: function (): Promise<AxiosResponse<string>> {
    return axios({
      method: 'GET',
      url: '/api/auth/checkToken',
    });
  },

  fetchServiceTypes: async function (): Promise<ServiceTypeDto[]> {
    return new Promise((res) => setTimeout(() => res(mockServiceTypeDtos), 1000));
    // const res: AxiosResponse<ServiceTypeDto[]> = await axios({
    //   method: 'GET',
    //   url: '/api/serviceTypes',
    // });
    // return res.data;
  },

  fetchStaffList: async function (): Promise<StaffDto[]> {
    return new Promise((res) => setTimeout(() => res(mockStaffList), 1000));
    // const res: AxiosResponse<StaffDto[]> = await axios({
    //   method: 'GET',
    //   url: '/api/staff',
    // });
    // return res.data;
  },

  fetchCaptcha: async function (): Promise<string> {
    // Generate a random number between 100000 and 999999 (inclusive)
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return new Promise((res) => setTimeout(() => res(randomNumber.toString()), 1000));
    // const res: AxiosResponse<string> = await axios({
    //   method: 'GET',
    //   url: '/api/captcha',
    //   headers: defaultHeaders,
    // });
    // return res.data;
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
