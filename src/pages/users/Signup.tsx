import React from 'react';
import supabase from "../../utils/Api"
import { useSessionUserContext } from '../../contexts/SessionUser';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Signup: React.FC = () => {
  const { sessionUser, setSessionUser } = useSessionUserContext();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const onSubmit = () => {
    return signUp(getValues('email'), getValues('password'))
  }

  async function signUp(email = '', password = '') {
    if (email && password)
      await supabase?.auth.signUp({
        email: email,
        password: password,
      }).then((response) => {
        const { data, error } = response;
        if (error) {
          alert(error);
        } else if (data?.session && data?.user) {
          setSessionUser({
            id: data.session.user.id,
            access_token: data.session.access_token,
            expires_at: data.session.expires_at,
            session: data.session,
            email: data.user.email,
            user: { id: data.user.id, email: data.user.email }
          })
          return true;
        }
      });
    return false;
  }

  useEffect(() => {
    if (sessionUser) navigate('/');
  }, [sessionUser]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
      <div className="row">
        <input type="email" placeholder="Email" defaultValue="" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}
      </div>
      <div className="row">
        <input type="email" placeholder="Email repeat" defaultValue="" {...register("emailConfirm", { required: true, validate: (value) => value === getValues("email") || "email don't match" })} />
        {errors.email && <span>This field is required</span>}
      </div>
      <div className="row">
        <input type="password" placeholder="Password" {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
      </div>
      <div className="row">
        <input type="password" placeholder="Password repeat" {...register("passwordConfirm", { required: true, validate: (value) => value === getValues("password") || "password don't match" })} />
        {errors.password && <span>This field is required</span>}
      </div>
      <div className="row">
        <input type="submit" className="button button-primary" />
      </div>
    </form>
  );
}

export default Signup