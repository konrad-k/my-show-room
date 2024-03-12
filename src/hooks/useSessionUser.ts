import { useState } from 'react';
import User from '../models/user.model';

export default function useSessionUser() {
  const getUser = () => {
    const userFromStorage = localStorage.getItem('user') || null;
    return userFromStorage && JSON.parse(userFromStorage);
  };

  const [sessionUser, setSessionUser] = useState(getUser() || null);

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setSessionUser(user)
  };

  return {
    setSessionUser: saveUser,
    sessionUser
  };
}
