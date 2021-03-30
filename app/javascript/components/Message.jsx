import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
//import '../styles/Message.scss';
import { getRelativeTimeInWords } from '../utils/time';

function Message({ id, author_profile_image_url, author_first_name, author_last_name, content, sent_at, isCollapsible }) {
  const [isOpen, setIsOpen] = useState(!isCollapsible);
  const authorFullName = `${author_first_name} ${author_last_name}`;

  // toggles message open state
  function openMessage() {
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }
  };

  function renderAuthorProfileImage() {
    if (author_profile_image_url) {
      // render author's profile image if exists
      return (
        <img className="rounded-circle float-left mr-3" width="55" src={author_profile_image_url} alt="profile" />
      )
    } else {
      // render fallback image using author's initials
      const initials = author_first_name.charAt(0) + author_last_name.charAt(0);
      return (
        <div className="fallback-profile-img mr-3 float-left rounded-circle">
          <strong className="initials font-weight-bold">
            {initials}
          </strong>
        </div>
      )
    }
  };

  return (
    <div key={id} className="Message">
      <div className="py-3" onClick={openMessage}>
        
        {renderAuthorProfileImage()}

        {/* Author and message details */}
        <div className={"author-header text-decoration-none " + (isCollapsible ? 'show-pointer-on-hover' : '')}>
          <div className="d-flex align-items-center justify-content-between mb-1">
            <span className="font-weight-bold">{authorFullName}</span>
            <small>{getRelativeTimeInWords(sent_at)}</small>
          </div>
          <div className={"text-muted overflow-hidden text-nowrap text-truncate " + (isOpen ? "invisible" : "visible")}>
            {content}
          </div>
        </div>
      </div>

      {/* Collapsible message content */}
      <Collapse in={isOpen} timeout={0}>
        <div className="message-content mt-1">
          <span className="pt-4 pb-5 d-inline-block">{content}</span>
        </div>
      </Collapse>
    </div>
  );
};

export default Message;