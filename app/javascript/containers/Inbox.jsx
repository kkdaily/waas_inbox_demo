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
import { FormControl, InputGroup } from 'react-bootstrap';
import { DESKTOP_WIDTH } from '../enums/screenWidth';

function Inbox() {
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [searchText, setSearchText] = useState('');
  const size = useWindowSize();

  // fetch conversations matching the searchbox text
  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await getConversations({ search: searchQuery });
        setConversations(resp.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [searchQuery]);

  // fetch additional conversations and append to existing state
  async function loadMoreConversations() {
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
  
  // when user presses "enter" in the messages search bar
  function onSearchKeyPress(ev) {
    if (ev.key === 'Enter') {
      setSearchQuery(searchText);
    }
  };

  function renderSearchbox() {
    return (
      <InputGroup className="searchbox">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl 
          className="searchbox" 
          value={searchText} 
          onChange={(ev) => setSearchText(ev.target.value)}
          onKeyPress={onSearchKeyPress} className="shadow-none" placeholder="Search messages" aria-label="Search messages"/>
      </InputGroup>
    )
  };

  return (
    <Container className="Inbox" fluid="xl">
      {/* Mobile + Tablet view */}
      {size.width < DESKTOP_WIDTH ? (
        <Switch>
          <Route exact path="/conversations">
            <Navigation />
            {renderSearchbox()}
            <ConversationList 
              conversations={conversations} 
              onScrollBottom={loadMoreConversations} 
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
              <Col lg={5} xl={5}>
                {renderSearchbox()}
                <ConversationList 
                  conversations={conversations} 
                  onScrollBottom={loadMoreConversations} 
                  isLoading={isLoadingConversations}
                />
              </Col>
              <Col className="conversation-details-wrapper" lg={7} xl={7}>
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