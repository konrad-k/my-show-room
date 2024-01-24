import React from 'react';
import supabase from "../../utils/Api"
import { useSessionUserContext, SessionUser } from '../../contexts/SessionUser';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import camelcaseKeys from 'camelcase-keys';

const Autorization: React.FC = () => {
  const { sessionUser, setSessionUser } = useSessionUserContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    signInWithEmail(data.email, data.password)
  }

  async function signInWithEmail(email: any, password: any) {
    supabase.auth.signInWithPassword({
      email: email,
      password: password,
    }).then((response) => {
      const { data, error } = response;
      if (error) {
        alert(error);
      } else if (data) {

        const profilePromise = supabase.from('profiles')
          .select("*")
          .eq('user_id', data?.session?.user.id)

        const organizationPromise = supabase.from('organizations')
          .select("*")
          .eq('user_id', data?.session?.user.id)

        Promise.all([profilePromise, organizationPromise])
          .then(([profileResponse, organizationResponce]) => {
            const [profile] = profileResponse.data;
            const [organization] = organizationResponce.data;

            const newSession: SessionUser = {
              id: data?.session?.user.id,
              access_token: data?.session?.access_token,
              expires_at: data?.session?.expires_at,
              session: data.session,
              email: data?.user?.email,
              user: { id: data.user.id, email: data.user.email },
              profile: camelcaseKeys(profile) || {},
              organization: camelcaseKeys(organization) || {}
            };
            setSessionUser(newSession);
          });
      }
    });

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