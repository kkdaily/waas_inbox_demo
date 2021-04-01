import React from 'react';
import { authContext } from '../hooks/useAuth';
import { useProvideAuth } from '../hooks/useProvideAuth';

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export default ProvideAuth;