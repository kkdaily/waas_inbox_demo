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

function Inbox() {
  const TABLET_WIDTH = 992;
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const size = useWindowSize();

  // fetch conversations matching the searchbox text
  useEffect(() => {
    async function fetchData() {
      const data = await getConversations({ search: searchQuery });
      setConversations(data);
    }
    fetchData();
  }, [searchQuery]);

  // fetch additional conversations and append to existing state
  async function loadMoreConversations() {
    setIsLoadingConversations(true);

    const data = await getConversations({ search: searchQuery, offset: conversations.length });
    const newConversations = [...conversations, ...data];

    setConversations(newConversations);
    setIsLoadingConversations(false);
  };

  return (
    <Container className="Inbox" fluid="md">
      <Navigation />
      {/* Mobile + Tablet view */}
      {size.width <= TABLET_WIDTH ? (
        <Switch>
          <Route exact path="/conversations">
            <ConversationList
              conversations={conversations} 
              onScrollBottom={loadMoreConversations} 
              isLoading={isLoadingConversations} 
              onSearch={setSearchQuery}
            />
          </Route>
          <Route exact path="/conversations/:id">
            <ConversationDetails />
          </Route>
        </Switch>
      ) : (
        <Switch>
          {/* Desktop view */}
          <Route path="/conversations/:id">
            <Row className="mx-0">
              <Col className="pl-0" md={5} lg={6} xl={5}>
                <ConversationList 
                  conversations={conversations} 
                  onScrollBottom={loadMoreConversations} 
                  isLoading={isLoadingConversations} 
                  onSearch={setSearchQuery}
                />
              </Col>
              <Col className="conversation-details-wrapper" md={7} lg={6} xl={7}>
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