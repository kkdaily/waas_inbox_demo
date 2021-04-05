import React from 'react';
import { Link } from 'react-router-dom';
import { getRelativeTimeInWords } from '../utils/time';

function ConversationCard({ id, profile_image_url, name, last_message_sent_at, clipped_message }) {
  return (
    <Link key={id} to={`/conversations/${id}`} className="ConversationCard text-decoration-none">
      <div className="content-wrapper py-3">
        
        {/* Profile image */}
        <img className="rounded float-left mr-3" width="70" src={profile_image_url} alt="profile" />

        {/* Author and message details */}
        <div className="sender-header text-decoration-none show-pointer-on-hover">
          <div className="d-flex align-items-center justify-content-between mb-1">
            <span className="name font-weight-bold">{name}</span>
            <small className="text-muted">{getRelativeTimeInWords(last_message_sent_at)}</small>
          </div>
          {/* show truncated message as a preview */}
          <div className={"text-muted overflow-hidden text-nowrap text-truncate"}>
            {clipped_message}
          </div>
        </div>
      </div>
    </Link>
  )
};

export default ConversationCard;