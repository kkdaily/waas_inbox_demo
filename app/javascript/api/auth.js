import axios from 'axios';
import { getCsrfToken } from '../utils/security';

const BASE_URI = '/api/v1';

export const login = async ({ username, password }) => {
  const token = getCsrfToken();

  return axios.post(`${BASE_URI}/login`, {
    username,
    password
  }, {
    withCredentials: true,
    headers: {
      'X-CSRF-Token': token
    }
  });
};

export const logout = async () => {
  const token = getCsrfToken();

  return axios.delete(`${BASE_URI}/logout`, {
    withCredentials: true,
    headers: {
      'X-CSRF-Token': token
    }
  });
};

export const loginStatus = async () => {
  return axios.get(`${BASE_URI}/logged_in`, {
    withCredentials: true,
  });
};
