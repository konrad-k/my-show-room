import supabase from "../../utils/Api"
import { useSessionUserContext } from '../../contexts/SessionUser';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const {setSessionUser} = useSessionUserContext();
  const navigate = useNavigate();
  
  SignOut();

  async function SignOut() {
    const { error } = await supabase?.auth.signOut() || {};
    
    if (!error) {
      setSessionUser(null);
      navigate('/');
    } else {
      alert(error);
    }
  }
  return <></>;
}

export default Logout