import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import useVisibilitySensor from "@rooks/use-visibility-sensor"
import ConversationCard from '../components/ConversationCard';
import { FormControl, InputGroup } from 'react-bootstrap';

function ConversationList({ conversations, onScrollBottom, isLoading, onSearch }) {
  let { id } = useParams();
  const loadingEl = useRef(null);
  const { isVisible } = useVisibilitySensor(loadingEl, { intervalCheck: true });
  const [searchText, setSearchText] = useState('');

  // when user scrolls to the bottom of the conversation list
  useEffect(() => {
    if (isVisible) {
      onScrollBottom();
    }
  }, [isVisible]);

  // when user presses "enter" in the messages search bar
  function onSearchKeyPress(ev) {
    if (ev.key === 'Enter') {
      onSearch(searchText);
    }
  };

  function renderSearchbox() {
    return (
      <InputGroup 
        className="searchbox" 
        value={searchText} 
        onChange={(ev) => setSearchText(ev.target.value)} 
        onKeyPress={onSearchKeyPress}>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i class="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl className="shadow-none" placeholder="Search messages" aria-label="Search messages"/>
      </InputGroup>
    )
  };

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
      {renderSearchbox()}
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