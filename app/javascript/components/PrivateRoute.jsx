import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { loginStatus } from '../api/auth';

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLoginStatus();
  }, []);

  async function getLoginStatus() {
    try {
      const resp = await loginStatus();

      if (resp.data.logged_in) {
        auth.update({ isLoggedIn: true, user: resp.data.user });
      } else {
        auth.update({ isLoggedIn: false, user: {} });
      }
      setIsLoading(false);
    } catch (err) {
      console.error('error getting login status:', err);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <Route
          {...rest}
          render={({ location }) =>
            auth.isLoggedIn ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: location }
                }}
              />
            )
          }
        />
      )}
    </>
  );
};

export default PrivateRoute;