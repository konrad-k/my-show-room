import React from 'react';

interface profileEditFormProps {
  profile: Profile;
  registrProfile: any;
  profileErrors: any;
  onSubmit: any;
  onReset?: any;
}

export const ProfileEditForm: React.FC<profileEditFormProps> = props => {
  const {profile, registrProfile, profileErrors, onSubmit, onReset} = props;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true}>
    <div className="row">
      <input type="text" placeholder="First Name" defaultValue={profile?.firstName}  {...registrProfile("firstName", { required: true })} />
      {profileErrors.firstName && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Last Name" defaultValue={profile?.lastName} {...registrProfile("lastName", { required: true })} />
      {profileErrors.lastName && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Avatar url" defaultValue={profile?.avatarUrl} {...registrProfile("avatarUrl")} />
    </div>
    <div className="row">
    <input type="submit" className="button button-primary" value="Save profile" />
    </div>
  </form>
}