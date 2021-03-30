import axios from 'axios';

const domain = 'http://localhost:3002'

export const getConversations = async ({ search = '', offset = 0 }) => {
  try {
    const resp = await axios.get(`${domain}/conversations?search=${search}&offset=${offset}`);
    return resp.data;
  } 
  catch (err) {
    console.error(err);
  }
}

export const getConversation = async ({ id }) => {
  try {
    const resp = await axios.get(`${domain}/conversations/${id}`);
    return resp.data;
  }
  catch (err) {
    console.error(err);
  }
}