import { useSessionUserContext } from '../contexts/SessionUser';

const Dashboard = () => {
  const {sessionUser} = useSessionUserContext();
  
  return <h1>Hello {!sessionUser?.profile?.fullName || 'art lover'}</h1>
}

export default Dashboard;
