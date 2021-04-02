import React, { useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import useVisibilitySensor from "@rooks/use-visibility-sensor"
import ConversationCard from '../components/ConversationCard';
import useWindowSize from '../hooks/useWindowSize';

function ConversationList({ conversations, onScrollBottom, isLoading }) {
  let { id } = useParams();
  const loadingEl = useRef(null);
  const { isVisible } = useVisibilitySensor(loadingEl, { intervalCheck: true });
  const size = useWindowSize();

  // when user scrolls to the bottom of the conversation list
  useEffect(() => {
    if (isVisible) {
      onScrollBottom();
    }
  }, [isVisible]);

  // fix mobile Safari scroll bug with fixed elements
  useEffect(() => {
    if (size.width <= 992) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // cleanup
    return () => document.body.classList.remove('overflow-hidden');
  }, [size])

  function renderInboxCards() {
    return conversations.map((conversation) => {
      const isSelectedConversation = id == conversation.id;

      return (
        <ListGroup.Item key={conversation.id} className={isSelectedConversation ? 'highlight-conversation' : ''}>
          <ConversationCard {...conversation} />
        </ListGroup.Item>
      );
    });
  };

  return (
    <Container className="ConversationList">
      {conversations.length ? (
        <>
          <ListGroup>
            {renderInboxCards()}
          </ListGroup>
          <Card ref={loadingEl} className={"loading-container " + (isLoading ? "visible" : "invisible")}>
            <Card.Body className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Card.Body>
          </Card>
        </>
      ) : (
        <Card>
          <Card.Body>No conversations found.</Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ConversationList;