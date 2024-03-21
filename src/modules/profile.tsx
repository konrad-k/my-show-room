import React from 'react';
import { Profile as ProfileType, profileValidate } from "../models/profile.model";
import { EditFormProps } from "./EditForm";
import useFileUploader from '../hooks/useFileUploader'
import BeatLoader from "react-spinners/BeatLoader";
import Input from '../components/form/input';

interface profileEditFormProps extends EditFormProps {
  profile: ProfileType;
}

export class Profile {
  id?: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  userId?: string;

  constructor({ firstName, lastName }: ProfileType) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export const ProfileEditForm: React.FC<profileEditFormProps> = ({ profile, onSubmit, onReset, form }) => {
  const { register, formState: { errors } } = form;
  const { Controller: ImageController, isLoading: imageLoading, imageErrors } = useFileUploader({ name: 'avatar', from: 'profiles', actor: profile, form }, () => { });

  const isLoading = form.formState.isSubmitting || imageLoading;

  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    <Input name="firstName" label="First name" register={register} validations={profileValidate} errors={errors} />
    <Input name="lastName" label="Last name" register={register} validations={profileValidate} errors={errors} />
    <Input name="avatarUrl" label="Avatar" register={register} validations={profileValidate} errors={{ ...errors, imageUrl: imageErrors }}>
      <ImageController />
    </Input>
    <div className="row">
      <button type="submit" className={`button button-primary has-loading ${isLoading ? 'loading' : ''}`}>
        {isLoading && <div className="loading-wrapper"><BeatLoader color="currentColor" size={10} /></div>}
        <span>Save</span>
      </button>
    </div>
  </form>
}