import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Reply({ onSubmit, onSuccess }) {
  const [message, setMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // disables "send" button if there are no non-whitespace characters
    if (message.trim().length >= 1) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [message]);

  async function submit() {
    setIsErrorVisible(false);
    setIsSubmitDisabled(true);
    setIsLoading(true);

    try {
      const resp = await onSubmit(message);

      if (resp.data) {
        setMessage('');
        onSuccess();
      } else {
        setIsErrorVisible(true);
      }
      setIsSubmitDisabled(false);
      setIsLoading(false);
    } catch (err) {
      setIsErrorVisible(true);
      setIsSubmitDisabled(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="Reply">
      <div className="message-wrapper">
        <Form>
          <Form.Group>
            <Form.Control 
              className="border-0 shadow-none" 
              placeholder="Write a message..." 
              as="textarea" 
              rows={4} 
              onChange={(ev) => setMessage(ev.target.value)} value={message} />
          </Form.Group>
        </Form>
        <div className="d-grid gap-2 text-right">
          <Button className="submit-btn" disabled={isSubmitDisabled} onClick={submit} variant="orange">
            <span>Send</span>
            {isLoading ? (
              <Spinner
                className="ml-2"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <i className="ml-2 fas fa-paper-plane"></i>
            )}
          </Button>
        </div>
      </div>
      {isErrorVisible && (
        <div className="mt-2">
          Unable to send message. Please try again.
        </div>
      )}
    </div>
  );
};

export default Reply;