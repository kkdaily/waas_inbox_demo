import axios from 'axios';
import { getCsrfToken } from '../utils/security';

const BASE_URI = 'http://localhost:3001/api/v1';

export const signInUser = async ({ username, password }) => {
  const token = getCsrfToken();

  return axios.post(`${BASE_URI}/sessions`, {
    username,
    password
  }, {
    headers: {
      'X-CSRF-Token': token
    }
  });
}

export const logoutUser = async () => {
  return axios.get(`${BASE_URI}/sessions`);
}

export const getSession = async () => {
  return axios.get(`${BASE_URI}/sessions/user`);
};