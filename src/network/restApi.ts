import axios, { AxiosResponse } from 'axios';

import { AuthenticateResponseBodyDto } from '../interfaces/authenticate';
import { StaffDto } from '../interfaces/staff';
import { ServiceTypeDto } from '../interfaces/serviceType';
import { BookingRequestDto } from '../interfaces/booking';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const SERVER_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : process.env.REACT_APP_SERVER_URL;

const restApi = {
  authenticate: function (email: string, password: string): Promise<AxiosResponse<AuthenticateResponseBodyDto>> {
    return axios({
      method: 'POST',
      url: `${SERVER_URL}/api/auth/login`,
      data: { email, password },
      headers: defaultHeaders,
    });
  },

  logout: function (): Promise<AxiosResponse<string>> {
    return axios({
      method: 'POST',
      url: `${SERVER_URL}/api/auth/logout`,
      headers: defaultHeaders,
    });
  },

  checkLoginStatus: function (): Promise<AxiosResponse<string>> {
    return axios({
      method: 'GET',
      url: `${SERVER_URL}/api/auth/checkToken`,
    });
  },

  fetchServiceTypes: async function (): Promise<ServiceTypeDto[]> {
    const res: AxiosResponse<ServiceTypeDto[]> = await axios({
      method: 'GET',
      url: `${SERVER_URL}/api/serviceTypes`,
    });
    return res.data;
  },

  fetchStaffList: async function (): Promise<StaffDto[]> {
    const res: AxiosResponse<StaffDto[]> = await axios({
      method: 'GET',
      url: `${SERVER_URL}/api/staff`,
    });
    return res.data;
  },

  fetchCaptcha: async function (): Promise<string> {
    const res: AxiosResponse<string> = await axios({
      method: 'GET',
      url: `${SERVER_URL}/api/captcha`,
      headers: defaultHeaders,
    });
    return res.data;
  },

  bookAppointment: async function (data: BookingRequestDto): Promise<void> {
    // TODO: Make a custom util for calling REST APIs, so that
    // the catch block like the one below won't be necessary
    try {
      await axios({
        method: 'POST',
        url: `${SERVER_URL}/api/booking`,
        data: data,
        headers: defaultHeaders,
      });
    } catch (error: any) {
      if (error.isAxiosError) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error);
    }
  },
};

export default restApi;
