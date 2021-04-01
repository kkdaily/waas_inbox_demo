import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
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
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    getConversationData(id);
  }, [id]);

  async function getConversationData(id) {
    setIsErrorVisible(false);

    try {
      const resp = await getConversation({ id });

      if (resp.data) {
        setCompany(resp.data.company_data);
        setMessages(resp.data.messages_data);
      } else {
        setIsErrorVisible(true);
      }
    } catch (err) {
      setIsErrorVisible(true);
    }
  }

  function renderMessages() {
    return messages.map((message, index) => {
      // make the most recent message un-collapsible
      const isLastMessage = messages.length - 1 === index;
      return <Message key={message.id} {...message} isCollapsible={!isLastMessage} />
    });
  };

  return (
    <Container className="ConversationDetails">
      {isErrorVisible ? (
        <Card className="text-center">
          <Card.Body>Sorry, we're unable to load this conversation. Please try again.</Card.Body>
        </Card>
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