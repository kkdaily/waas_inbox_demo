import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { getRelativeTimeInWords } from '../utils/time';

function ConversationCard({ id, profile_image_url, name, last_message_sent_at, clipped_message }) {
  return (
    <Link key={id} to={`/conversations/${id}`} className="ConversationCard text-decoration-none">
      <Card className="inbox-card pl-3">
        <Card.Img variant="top" src={profile_image_url} />
        <Card.Body>
          <div className="header">
            <strong className="company-name mb-1">{name}</strong>
            <small className="text-muted">{getRelativeTimeInWords(last_message_sent_at)}</small>
          </div>
          <Card.Text className="text-muted">
            {clipped_message}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
};

export default ConversationCard;