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

function Inbox() {
  const TABLET_WIDTH = 992;
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
        // TODO: handle error
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
    } catch (err) {
      // TODO: handle error
    }
    
    setIsLoadingConversations(false);
  };
  
  // when user presses "enter" in the messages search bar
  function onSearchKeyPress(ev) {
    if (ev.key === 'Enter') {
      setSearchQuery(searchText);
    }
  };

  function renderSearchbox() {
    return (
      <InputGroup 
        className="searchbox" 
        value={searchText} 
        onChange={(ev) => setSearchText(ev.target.value)}
        onKeyPress={onSearchKeyPress}
      >
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl className="shadow-none" placeholder="Search messages" aria-label="Search messages"/>
      </InputGroup>
    )
  };

  return (
    <Container className="Inbox" fluid="xl">
      <Navigation />
      {/* Mobile + Tablet view */}
      {size.width <= TABLET_WIDTH ? (
        <Switch>
          <Route exact path="/conversations">
            {renderSearchbox()}
            <ConversationList
              conversations={conversations} 
              onScrollBottom={loadMoreConversations} 
              isLoading={isLoadingConversations} 
              onSearch={setSearchQuery}
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
            <Row>
              <Col lg={5} xl={5}>
                {renderSearchbox()}
                <ConversationList 
                  conversations={conversations} 
                  onScrollBottom={loadMoreConversations} 
                  isLoading={isLoadingConversations} 
                  onSearch={setSearchQuery}
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