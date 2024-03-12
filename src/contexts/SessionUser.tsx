import React from 'react';
import useSessionUser from '../hooks/useSessionUser';
import Profile from '../models/profile.model';
import Organization from '../models/organization.model';
import User from '../models/user.model';
import { Session } from '@supabase/supabase-js';

export type SessionUser = {
  id: string,
  access_token: string,
  expires_at: number,
  session: Session,
  email: string,
  user?: User,
  profile?: Profile,
  organization?: Organization
}

type SessionUserContextType = {
  sessionUser?: SessionUser,
  setSessionUser: (user: SessionUser) => void
}

export const SessionUserContext = React.createContext<SessionUserContextType>({} as SessionUserContextType);

export const SessionUserProvider: React.FC<React.ReactNode | any> = ({ children }) => {
  const { sessionUser, setSessionUser } = useSessionUser();

  return (
    <SessionUserContext.Provider key={sessionUser?.user?.id || null} value={{ sessionUser, setSessionUser }}>
      {children}
    </SessionUserContext.Provider>
  );
}

export const useSessionUserContext = () => React.useContext(SessionUserContext) as SessionUserContextType;
