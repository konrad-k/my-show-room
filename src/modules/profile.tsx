import React from 'react';
import { Profile as ProfileType } from "../models/profile.model";
import { EditFormProps } from "./EditForm";
import useFileUploader from '../hooks/useFileUploader'
import BeatLoader from "react-spinners/BeatLoader";

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
  const { Controller: ImageController, loading } = useFileUploader({ name: 'avatar', from: 'profiles', actor: profile, form }, () => { });
  
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    <div className="row">
      <label className="cell-6 label">First Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="First Name" defaultValue={profile?.firstName}  {...register("firstName", { required: true })} />
        {errors.firstName && <span>This field is required</span>}
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Last Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Last Name" defaultValue={profile?.lastName} {...register("lastName", { required: true })} />
        {errors.lastName && <span>This field is required</span>}
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Avatar URL:</label>
      <div className="cell-10">
        <ImageController/>
      </div>
    </div>
    <div className="row">
      <button type="submit" className={`button button-primary has-loading ${loading ? 'loading' : ''}`}>
        {loading && <div className="loading-wrapper"><BeatLoader color="currentColor" size={10} /></div> }
        <span>Save</span>
      </button>
    </div>
  </form>
}