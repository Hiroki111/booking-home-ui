// import axios, { AxiosResponse } from 'axios';

import { Staff } from '../interfaces/staff';
import { ServiceType } from '../interfaces/serviceType';
import { BookingRequest } from '../interfaces/booking';
import { mockServiceTypes } from './__mocks__/mockServiceType';
import { mockStaffList } from './__mocks__/mockStaffList';

const restApi = {
  fetchServiceTypes: async function (): Promise<ServiceType[]> {
    return new Promise((res) => setTimeout(() => res(mockServiceTypes), 1000));
    // const res: AxiosResponse<ServiceType[]> = await axios({
    //   method: 'GET',
    //   url: '/api/serviceTypes',
    // });
    // return res.data;
  },

  fetchStaffList: async function (): Promise<Staff[]> {
    return new Promise((res) => setTimeout(() => res(mockStaffList), 1000));
    // const res: AxiosResponse<Staff[]> = await axios({
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

  bookAppointment: async function (data: BookingRequest): Promise<void> {
    // TODO: remove it
    await new Promise((res) => setTimeout(res, 1000));
    // try {
    //   await axios({
    //     method: 'POST',
    //     url: '/api/bookings',
    //     data: data,
    //     headers: defaultHeaders,
    //   });
    // } catch (error: any) {
    //   if (error.isAxiosError) {
    //     throw new BookingRequestError(
    //       error?.response?.data?.message || 'API request failed',
    //       error?.response?.data?.errorCode,
    //     );
    //   }
    //   throw error;
    // }
  },
};

export default restApi;
