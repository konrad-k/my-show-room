import api from "../utils/Api"
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import Profile from "../models/profile.model";
import { FieldValues } from "react-hook-form";

export const getProfile = async (userId: string) => {
  const {data: profiles} = await api!.from('profiles')
    .select("*")
    .eq('user_id', userId);

  return returnOneProfile(profiles as Profile[]);
}

export const uploadProfile = async (data: FieldValues, userId: string) => {
  if (!data?.id) {
    data.userId = userId;
  }
  const {data: profiles } = await api!.from('profiles').upsert(snakecaseKeys(data)).eq(data.id ? 'id' : 'user_id', data.id ? data.id : userId)
  .select();

  return returnOneProfile(profiles as Profile[]);
}

function returnOneProfile(profiles: Profile[]) {
  const [one] = profiles ?? [] as Profile[];
  return camelcaseKeys(one ?? {} as Profile);
}