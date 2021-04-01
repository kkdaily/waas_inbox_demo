import axios from 'axios';

const BASE_URI = '/api/v1/conversations';

export const getConversations = async ({ search = '', offset = 0 }) => {
  return axios.get(`${BASE_URI}?search=${search}&offset=${offset}`);
};

export const getConversation = async ({ id }) => {
  return axios.get(`${BASE_URI}/${id}`);
};