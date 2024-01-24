import React from 'react';
import { Profile as ProfileType } from "../models/profile.model";
import { EditFormProps } from "./EditForm";

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

export const ProfileEditForm: React.FC<profileEditFormProps> = props => {
  const { profile, registr, errors, onSubmit, onReset } = props;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true}>
    <div className="row">
      <input type="text" placeholder="First Name" defaultValue={profile?.firstName}  {...registr("firstName", { required: true })} />
      {errors.firstName && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Last Name" defaultValue={profile?.lastName} {...registr("lastName", { required: true })} />
      {errors.lastName && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Avatar url" defaultValue={profile?.avatarUrl} {...registr("avatarUrl")} />
    </div>
    <div className="row">
      <input type="submit" className="button button-primary" value="Save profile" />
    </div>
  </form>
}