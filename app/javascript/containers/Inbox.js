import React, { useEffect, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect, Route, Switch } from 'react-router';
import { getConversations } from '../api/conversations';
import useWindowSize from '../hooks/useWindowSize';
import ConversationDetails from './ConversationDetails';
import ConversationList from './ConversationList';
//import '../styles/Inbox.scss';

function Inbox() {
  const TABLET_WIDTH = 992;
  const [conversations, setConversations] = useState([]);
  const [searchText, setSearchText] = useState('');
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

  // when user presses "enter" in the messages search bar
  function onSearchKeyPress(ev) {
    if (ev.key === 'Enter') {
      setSearchQuery(searchText);
    }
  };

  function renderSearchbox() {
    return (
      <InputGroup className="searchbox py-3" value={searchText} onChange={(ev) => setSearchText(ev.target.value)} onKeyPress={onSearchKeyPress}>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Search messages"
          aria-label="Search messages"
        />
      </InputGroup>
    )
  };

  return (
    <Container className="Inbox" fluid="md">
      {size.width <= TABLET_WIDTH ? (
        <Switch>
          {/* Mobile + Tablet view */}
          <Route exact path="/conversations">
            {renderSearchbox()}
            <ConversationList conversations={conversations} onScrollBottom={loadMoreConversations} isLoading={isLoadingConversations} />
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
              <Col md={5} lg={6} xl={5}>
                {renderSearchbox()}
                <ConversationList conversations={conversations} onScrollBottom={loadMoreConversations} isLoading={isLoadingConversations} />
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