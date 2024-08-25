import axios from 'axios';
import {LoginParam, LoginResponse} from '../types/login';
import shipment from '../config/shipment';

export const logUserIn = async (param: LoginParam): Promise<LoginResponse> => {
  try {
    const res = await shipment.post('/method/login', param, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.message) {
      return {
        error: error.response?.data?.message,
      };
    }

    return {
      error: 'Request failed, please try again',
    };
  }
};
