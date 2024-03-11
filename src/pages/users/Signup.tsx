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
    <div className="content-holder padding-top-4 grid justify-center">
      <div className="cell-auto">
        <h1 className="text-center">Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true} className="grid grid-form space-2 max-width-3">
          <div className="row">
            <label className="cell-6 label">E-mail:</label>
            <div className="cell-10">
              <input type="email" placeholder="Email" defaultValue="" {...register("email", { required: true })} />
              {errors.email && <span>This field is required</span>}

            </div>
          </div>
          <div className="row">
            <label className="cell-6 label">E-mail repeat:</label>
            <div className="cell-10">
              <input type="email" placeholder="Email repeat" defaultValue="" {...register("emailConfirm", { required: true, validate: (value) => value === getValues("email") || "email don't match" })} />
              {errors.email && <span>This field is required</span>}

            </div>
          </div>
          <div className="row">
            <label className="cell-6 label">Password:</label>
            <div className="cell-10">
              <input type="password" placeholder="Password" {...register("password", { required: true })} />
              {errors.password && <span>This field is required</span>}

            </div>
          </div>
          <div className="row">
            <label className="cell-6 label">Password repeat:</label>
            <div className="cell-10">
              <input type="password" placeholder="Password repeat" {...register("passwordConfirm", { required: true, validate: (value) => value === getValues("password") || "password don't match" })} />
              {errors.password && <span>This field is required</span>}

            </div>
            <div className="cell-16">
              <input type="submit" className="button button-primary" value="register" />
            </div>
          </div>
          <div className="cell-16">
            <p className="text-center">
              <a href="#/login">Log in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup