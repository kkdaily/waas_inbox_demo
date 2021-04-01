import axios from 'axios';

const BASE_URI = 'http://localhost:3001/api/v1';

export const getConversations = async ({ search = '', offset = 0 }) => {
  try {
    const resp = await axios.get(`${BASE_URI}/conversations?search=${search}&offset=${offset}`);
    return resp.data;
  } 
  catch (err) {
    console.error(err);
  }
}

export const getConversation = async ({ id }) => {
  try {
    const resp = await axios.get(`${BASE_URI}/conversations/${id}`);
    console.log('turtle')
    return resp.data;
  }
  catch (err) {
    console.error(err);
  }
}