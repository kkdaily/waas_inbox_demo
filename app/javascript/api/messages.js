import axios from 'axios';

export const sendMessage = async ({ conversationId, content }) => {
  try {
    const resp = await axios.post('http://localhost:3002/messages', {
      conversation_id: conversationId,
      content
    });
    return resp.data;
  } 
  catch (err) {
    console.error(err);
  }
};