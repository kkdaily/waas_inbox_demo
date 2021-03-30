import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import '../styles/Reply.scss';

function Reply({ onSubmit, onSuccess }) {
  const [message, setMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  useEffect(() => {
    // disables "send" button if there are no non-whitespace characters
    if (message.trim().length >= 1) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  }, [message]);

  async function submit() {
    setIsErrorVisible(false);
    const resp = await onSubmit(message);

    if (resp) {
      setMessage('');
      onSuccess();
    } else {
      setIsErrorVisible(true);
    }
  };

  return (
    <div className="Reply">
      <div className="message-wrapper">
        <Form>
          <Form.Group>
            <Form.Control className="border-0 shadow-none" placeholder="Write a message..." as="textarea" rows={4} onChange={(ev) => setMessage(ev.target.value)} value={message} />
          </Form.Group>
        </Form>
        <div className="d-grid gap-2 text-right">
          <Button className="submit-btn" disabled={isSubmitButtonDisabled} onClick={submit} variant="primary">
            <span>Send</span>
            <i className="ml-2 fas fa-paper-plane"></i>
          </Button>
        </div>
      </div>
      {isErrorVisible && (
        <div className="mt-2">
          Unable to send message. Please try again later.
        </div>
      )}
    </div>
  )
}

export default Reply;