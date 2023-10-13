import React from 'react';
import supabase from "../../utils/Api"
import { useSessionUserContext } from '../../contexts/SessionUser';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Autorization: React.FC = () => {
  const {sessionUser, setSessionUser} = useSessionUserContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    signInWithEmail(data.email, data.password)
  }

  async function signInWithEmail(email: any, password: any) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      alert(error);
    } else if (data) {

      const { data: profile } = await supabase.from('profile')
        .select("*")
        .eq('user_id', data?.session?.user.id)

      const { data: organization } = await supabase.from('organizations')
        .select("*")
        .eq('user_id', data?.session?.user.id)
      
      const newSession = {
        id: data?.session?.user.id,
        access_token: data?.session?.access_token,
        expires_at: data?.session?.expires_at,
        session: data.session,
        email: data?.user?.email,
        user: data.user,
        profile: {},
        organization: {}
      }

      if (profile?.length) {
        const [oneProfile] = profile;
        newSession.profile = oneProfile
      }

      if (organization?.length) {
        const [oneOrganization] = organization;
        newSession.organization = oneOrganization
      }

      setSessionUser(newSession);
    }
  }

  useEffect(() => {
    if (sessionUser) {
      if (!sessionUser?.profile) {
        navigate('/profile/update')
      } else {
        navigate('/');
      }
    }
  }, [sessionUser]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <input type="email" placeholder="Email" defaultValue="" {...register("email")} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="row">
          <input type="password" placeholder="Password" {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}
        </div>
        <div className="row">
        <input type="submit" className="button button-primary" />
        </div>
      </form>
      <p>
        <a href="#/signup">Sign up</a>
      </p>
    </>
    
  );
}

export default Autorization