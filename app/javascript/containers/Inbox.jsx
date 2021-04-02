import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect, Route, Switch } from 'react-router';
import { getConversations } from '../api/conversations';
import useWindowSize from '../hooks/useWindowSize';
import ConversationDetails from './ConversationDetails';
import ConversationList from './ConversationList';
import Navigation from '../components/Navigation';
import { DESKTOP_WIDTH } from '../enums/screenWidth';
import SearchBox from '../components/SearchBox';

function Inbox() {
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const size = useWindowSize();

  // fetch conversations matching the searchbox text
  useEffect(() => {
    getInitialConversations();
  }, [searchQuery]);

  async function getInitialConversations() {
    try {
      const resp = await getConversations({ search: searchQuery });
      setConversations(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  // fetch additional conversations via infinite scrolling and append to existing state
  async function getMoreConversations() {
    setIsLoadingConversations(true);

    try {
      const resp = await getConversations({ search: searchQuery, offset: conversations.length });
      const newConversations = [...conversations, ...resp.data];
      setConversations(newConversations);
      setIsLoadingConversations(false);
    } catch (err) {
      console.error(err);
      setIsLoadingConversations(false);
    }
  };

  return (
    <Container className="Inbox" fluid="sm">
      {/* Mobile + Tablet view */}
      {size.width <= DESKTOP_WIDTH ? (
        <Switch>
          <Route exact path="/conversations">
            <Navigation />
            <SearchBox onSearch={setSearchQuery} />
            <ConversationList 
              conversations={conversations} 
              onScrollBottom={getMoreConversations} 
              isLoading={isLoadingConversations}
            />
          </Route>
          <Route exact path="/conversations/:id">
            <Row>
              <Col className="conversation-details-wrapper">
                <ConversationDetails />
              </Col>
            </Row>
          </Route>
        </Switch>
      ) : (
        <Switch>
          {/* Desktop view */}
          <Route path="/conversations/:id">
            <Navigation />
            <Row>
              <Col lg={5} className="conversation-list-wrapper">
                <SearchBox onSearch={setSearchQuery} />
                <ConversationList 
                  conversations={conversations} 
                  onScrollBottom={getMoreConversations} 
                  isLoading={isLoadingConversations}
                />
              </Col>
              <Col className="conversation-details-wrapper" lg={7}>
                <ConversationDetails />
              </Col>
            </Row>
          </Route>
          {conversations.length && <Redirect from="/conversations" to={`/conversations/${conversations[0].id}`} />}
        </Switch>
      )}
    </Container>
  );
};

export default Inbox;