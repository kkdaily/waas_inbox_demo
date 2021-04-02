import { useState } from "react";

export function useProvideAuth() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const update = (data) => {
    setUser(data.user);
    setIsLoggedIn(data.isLoggedIn);
  };

  return {
    isLoggedIn,
    user,
    update
  };
};