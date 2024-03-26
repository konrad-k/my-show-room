import React, { useEffect } from 'react';
import api from "../../utils/Api"
import { useSessionUserContext } from '../../contexts/SessionUser';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Input from '../../components/form/input';
import { userValidate } from '../../models/user.model';

const Signup: React.FC = () => {
  const { sessionUser, setSessionUser } = useSessionUserContext();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const onSubmit = () => {
    return signUp(getValues('email'), getValues('password'))
  }

  async function signUp(email = '', password = '') {
    if (email && password)
      await api?.auth.signUp({
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
          <Input name="email" label="E-mail" register={register} validations={userValidate} errors={errors} />
          <Input name="emailConfirm" label="E-mail repeat" register={register} validations={userValidate} errors={errors} />
          <Input name="password" type="password" label="Password" register={register} validations={userValidate} errors={errors} />
          <Input name="passwordConfirm" type="password" label="Password repeat" register={register} validations={userValidate} errors={errors} />
          <div className="row">
            <div className="cell-16">
              <input type="submit" className="button block button-primary" value="Sign up" />
            </div>
          </div>
          <div className="row">
            <div className="cell-16">
              <p className="text-center">
                <a href="#/login">Log in</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup