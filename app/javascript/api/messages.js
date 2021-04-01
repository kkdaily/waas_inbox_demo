import axios from 'axios';
import { getCsrfToken } from '../utils/security';

const BASE_URI = '/api/v1/messages';

export const sendMessage = async ({ receiverId, content }) => {
  const token = getCsrfToken();

  return axios.post(BASE_URI, {
    content,
    receiver_id: receiverId
  }, {
    headers: {
      'X-CSRF-Token': token
    }
  });
};