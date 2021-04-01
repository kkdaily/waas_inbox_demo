import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { signInUser } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function SignIn() {
  let history = useHistory();
  let auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function login(ev) {
    ev.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const resp = await signInUser({ username, password });

      if (resp.data) {
        auth.updateUser(resp.data);
        history.push('/conversations');
      } 
      else {
        setError('Invalid username or password.');
      }
      setIsLoading(false);
    } 
    catch (err) {
      setIsLoading(false);
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <Container className="SignIn text-center">
      <Form className="form-signin m-auto">
        <Image className="mb-4" src="https://www.ycombinator.com/assets/ycdc/ycombinator-logo-b603b0a270e12b1d42b7cca9d4527a9b206adf8293a77f9f3e8b6cb542fcbfa7.png" alt="" width="72" height="72" rounded />
        
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <Form.Group controlId="inputUsername">
          <Form.Control value={username} onChange={(ev) => setUsername(ev.target.value)} type="text" placeholder="Username" />
          <Form.Control value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder="Password" />
        </Form.Group>
        
        {isLoading ? (
          <Button className="signin-btn my-3" size="lg" block onClick={login} variant="orange" disabled>
            Signing in...
            <Spinner className="ml-2" as="span" animation="border" size="md" role="status" aria-hidden="true" />
          </Button>
        ) : (
          <Button className="signin-btn my-3" size="lg" block onClick={login} variant="orange">
            Sign in
          </Button>
        )}
        

        <span>{error}</span>
      </Form>
    </Container>
  )
};

export default SignIn;