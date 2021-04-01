import axios from 'axios';
import { getCsrfToken } from '../utils/security';

const BASE_URI = '/api/v1/sessions';

export const signInUser = async ({ username, password }) => {
  const token = getCsrfToken();

  return axios.post(BASE_URI, {
    username,
    password
  }, {
    headers: {
      'X-CSRF-Token': token
    }
  });
};

export const logoutUser = async () => {
  return axios.get(BASE_URI);
};

export const getSession = async () => {
  return axios.get(`${BASE_URI}/user`);
};