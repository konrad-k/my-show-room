import api from "../utils/Api"
import Organization from "../models/organization.model";
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export const getOrganization = async (userId: string) => {
  const {data: organizations } = await api.from('organizations')
    .select("*")
    .eq('user_id', userId);
  
  if (organizations) {
    const [organization] = organizations as Organization[];
    return camelcaseKeys(organization) as Organization;
  } else {
    return {} as Organization;
  }
}

export const uploadOrganization = async (data: Organization, userId: string) => {
  if (!data?.id) {
    data.userId = userId;
  }
  const {data: organizations } = await api!.from('organizations').upsert(snakecaseKeys(data)).eq(data.id ? 'id' : 'user_id', data.id ? data.id : userId)
  .select();

  if (organizations) {
    const [organization] = organizations as Organization[];
    return camelcaseKeys(organization) as Organization;
  } else {
    return {} as Organization;
  }
}
