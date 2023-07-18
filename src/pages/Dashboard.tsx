import React from 'react';
import { useSessionUserContext } from '../contexts/SessionUser';

const Dashboard: React.FC = () => {
  const {sessionUser} = useSessionUserContext();
  
  return <h1>Hello {!sessionUser?.profile?.fullName || 'art lover'}</h1>
}

export default Dashboard;
