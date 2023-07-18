import React from 'react';
import useSessionUser from '../hooks/useSessionUser';

type SessionUser = {
  user: any,
  profile: any,
  organization: any
}

type SessionUserContextType = {
  sessionUser?: SessionUser,
  setSessionUser: (user: any) => void
}

export const SessionUserContext = React.createContext<SessionUserContextType>({} as SessionUserContextType);

export const SessionUserProvider: React.FC<React.ReactNode | any> = ({ children }) => {
  const { sessionUser, setSessionUser } = useSessionUser();

  return (
    <SessionUserContext.Provider key={sessionUser} value={{sessionUser, setSessionUser}}>
      {children}
    </SessionUserContext.Provider>
  );
}

export const useSessionUserContext = () => React.useContext(SessionUserContext) as SessionUserContextType;
