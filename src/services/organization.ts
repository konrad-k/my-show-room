import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import api from "../utils/Api"
import Organization from "../models/organization.model";
import { FieldValues } from "react-hook-form";

export const getOrganization = async (userId: string) => {
  const {data: organizations } = await api.from('organizations')
    .select("*")
    .eq('user_id', userId);
  
  return returnOneOrganization(organizations as Organization[]);
}

export const uploadOrganization = async (data: FieldValues, userId: string) => {
  if (!data?.id) {
    data.userId = userId;
  }
  const {data: organizations } = await api!.from('organizations').upsert(snakecaseKeys(data)).eq(data.id ? 'id' : 'user_id', data.id ? data.id : userId)
  .select();
  return returnOneOrganization(organizations as Organization[]);
}


function returnOneOrganization(Organizations: Organization[]) {
  const [one] = Organizations ?? [] as Organization[];
  return camelcaseKeys(one ?? {} as Organization);
}