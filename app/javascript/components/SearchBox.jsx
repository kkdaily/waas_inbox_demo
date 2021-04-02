import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

function SearchBox({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  // when user presses "enter" in the messages search bar
  function onSearchKeyPress(ev) {
    if (ev.key === 'Enter') {
      onSearch(searchText);
    }
  };

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
  );
};

export default SearchBox;