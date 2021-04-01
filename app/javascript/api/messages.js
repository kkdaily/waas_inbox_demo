import axios from 'axios';
import { getCsrfToken } from '../utils/security';

const BASE_URI = 'http://localhost:3001/api/v1';

export const sendMessage = async ({ receiverId, content }) => {
  const token = getCsrfToken();

  try {
    const resp = await axios.post(`${BASE_URI}/messages`, {
      content,
      receiver_id: receiverId
    }, {
      headers: {
        'X-CSRF-Token': token
      }
    });
    return resp.data;
  } 
  catch (err) {
    console.error(err);
  }
};