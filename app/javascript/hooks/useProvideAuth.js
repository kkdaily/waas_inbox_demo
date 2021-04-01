import { useState } from "react";

export function useProvideAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  function updateUser(userObj) {
    if (userObj) {

      localStorage.setItem('user', JSON.stringify(userObj));
      setUser(userObj);
    } else {
      localStorage.removeItem('user');
      setUser(null);
    }
  }

  return {
    user,
    updateUser
  };
}