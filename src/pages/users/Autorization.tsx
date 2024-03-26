import React, { useEffect } from 'react';
import api from "../../utils/Api"
import { useSessionUserContext, SessionUser } from '../../contexts/SessionUser';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import camelcaseKeys from 'camelcase-keys';
import Input from '../../components/form/input';
import { userValidate } from '../../models/user.model';

const Autorization: React.FC = () => {
  const { sessionUser, setSessionUser } = useSessionUserContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    signInWithEmail(data.email, data.password)
  }

  async function signInWithEmail(email: any, password: any) {
    api.auth.signInWithPassword({
      email: email,
      password: password,
    }).then((response) => {
      const { data, error } = response;
      if (error) {
        alert(error);
      } else if (data) {
        const profilePromise = api.from('profiles')
          .select("*")
          .eq('user_id', data?.session?.user.id)

        const organizationPromise = api.from('organizations')
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
    <div className="content-holder padding-top-4 grid justify-center">
      <div className="cell-auto">
        <h1 className="text-center">Log in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-form space-2 max-width-3">
          <Input name="email" label="E-mail" register={register} validations={userValidate} errors={errors} />
          <Input name="password" type="password" label="Password" register={register} validations={userValidate} errors={errors} />
          <div className="cell-16">
            <input type="submit" className="button block button-primary" value="Login" />
          </div>
          <div className="cell-16">
            <p className="text-center">
              <a href="#/signup">Sign up</a>
            </p>
          </div>
          <p><small>auth for test only:<br />kubrakkonrad@gmail.com / 74tBbCA87Y6AFQw</small></p>
        </form>
      </div>
    </div>

  );
}

export default Autorization