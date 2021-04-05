import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router';
import { getConversation } from '../api/conversations';
import { sendMessage } from '../api/messages';
import CompanyDetails from '../components/CompanyDetails';
import Message from '../components/Message';
import Reply from '../components/Reply';

function ConversationDetails() {
  let { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [company, setCompany] = useState({});
  let isMounted = true;

  useEffect(() => {
    getConversationData(id);

    // cleanup
    return () => isMounted = false;
  }, [id]);

  async function getConversationData(id) {
    try {
      const resp = await getConversation({ id });

      if (isMounted && resp.data) {
        setCompany(resp.data.company_data || {});
        setMessages(resp.data.messages_data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  function renderMessages() {
    return messages.map((message, index) => {
      // make the most recent message un-collapsible
      const isLastMessage = messages.length - 1 === index;
      return <Message key={message.id} {...message} isCollapsible={!isLastMessage} />
    });
  };

  return (
    <Container className="ConversationDetails">
      {!messages.length ? (
        <div className="text-center pt-4">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <CompanyDetails {...company} />
          <div id="message-thread">
            {renderMessages()}
          </div>
          <Reply 
            onSubmit={(message) => sendMessage({ receiverId: id, content: message })} 
            onSuccess={() => getConversationData(id)} 
          />
        </>
      )}
    </Container>
  );
};

export default ConversationDetails;