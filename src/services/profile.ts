import api from "../utils/Api"
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import Profile from "../models/profile.model";

export const getProfile = async (userId: string) => {
  const {data: profiles} = await api!.from('profiles')
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
  const {data: profiles } = await api!.from('profiles').upsert(snakecaseKeys(data)).eq(data.id ? 'id' : 'user_id', data.id ? data.id : userId)
  .select();

  if (profiles) {
    const [profile] = profiles as Profile[];
    return camelcaseKeys(profile) as Profile;
  } else {
    return {} as Profile;
  }
}