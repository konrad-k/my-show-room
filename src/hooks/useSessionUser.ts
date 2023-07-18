import { useState } from 'react';

export default function useSessionUser() {
  const getUser = () => {
    const userFromStorage = localStorage.getItem('user') || null;
    return userFromStorage && JSON.parse(userFromStorage);
  };

  const [sessionUser, setSessionUser] = useState(getUser());

  const saveUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
    setSessionUser(user)
  };

  return {
    setSessionUser: saveUser,
    sessionUser
  };
}
