import supabase from "../utils/Api"
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import Profile from "../models/profile.model";

interface profileEditFormProps {
  profile: Profile;
  registrProfile: any;
  profileErrors: any;
  onSubmit: any;
  onReset?: any;
}

export const getProfile = async (userId: string) => {
  const {data: profiles} = await supabase?.from('profiles')
    .select("*")
    .eq('user_id', userId);

  if (profiles) {
    const [profile] = profiles as Profile[];
    return camelcaseKeys(profile);
  } else {
    return {} as Profile;
  }
}

export const uploadProfile = async (data: Profile, userId: string) => {
  if (!data?.id) {
    data.userId = userId;
  }
  const {data: profiles } = await supabase?.from('profiles').upsert(snakecaseKeys(data)).eq(data.id ? 'id' : 'user_id', data.id ? data.id : userId)
  .select();

  if (profiles) {
    const [profile] = profiles as Profile[];
    return camelcaseKeys(profile) as Profile;
  } else {
    return {} as Profile;
  }
}

export const ProfileEditForm: React.FC<profileEditFormProps> = props => {
  const {profile, registrProfile, profileErrors, onSubmit, onReset} = props;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true}>
    <div className="row">
      <input type="text" placeholder="First Name" defaultValue={profile?.firstName}  {...registrProfile("firstName", { required: true })} />
      {profileErrors.first_name && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Last Name" defaultValue={profile?.lastName} {...registrProfile("lastName", { required: true })} />
      {profileErrors.last_name && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Avatar url" defaultValue={profile?.avatarUrl} {...registrProfile("avatarUrl")} />
    </div>
    <div className="row">
    <input type="submit" className="button button-primary" value="Save profile" />
    </div>
  </form>
}