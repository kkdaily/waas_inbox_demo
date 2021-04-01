import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { useAuth } from '../hooks/useAuth';
import { getRelativeTimeInWords } from '../utils/time';

function Message({ id, sender_id, sender_profile_image_url, sender_first_name, sender_last_name, content, sent_at, isCollapsible }) {
  let { user } = useAuth();
  const [isOpen, setIsOpen] = useState(!isCollapsible);
  const senderFullName = `${sender_first_name} ${sender_last_name}`;
  const messageTo = user.id === sender_id ? "you" : "to me";

  // toggles message open state
  function openMessage() {
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }
  };

  function renderAuthorProfileImage() {
    if (sender_profile_image_url) {
      // render sender's profile image if exists
      return (
        <img className="rounded-circle float-left mr-3" width="55" src={sender_profile_image_url} alt="profile" />
      )
    } else {
      // render fallback image using sender's initials
      const initials = sender_first_name.charAt(0) + sender_last_name.charAt(0);
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
        <div className={"sender-header text-decoration-none " + (isCollapsible ? 'show-pointer-on-hover' : '')}>
          <div className="d-flex align-items-center justify-content-between mb-1">
            <span className="font-weight-bold">{senderFullName}</span>
            <small>{getRelativeTimeInWords(sent_at)}</small>
          </div>
          {/* show truncated message as a preview */}
          <div className={"text-muted overflow-hidden text-nowrap text-truncate "}>
            {/* show "you" if the logged in user is the sender of the message. Otherwise, show "to me" */}
            {isOpen ? messageTo : content }
          </div>
        </div>
      </div>

      {/* Collapsible message content */}
      <Collapse in={isOpen} timeout={0}>
        <div className="message-content mt-1">
          <span className="pb-5 d-inline-block">{content}</span>
        </div>
      </Collapse>
    </div>
  );
};

export default Message;