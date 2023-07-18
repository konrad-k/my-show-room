import supabase from "../utils/Api"
import Organization from "../models/organization.model";
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

interface organizationEditFormProps {
  organization: Organization;
  registrOrganization: any;
  organizationErrors: any;
  onSubmit: any;
  onReset?: any;
}

export const getOrganization = async (userId: string) => {
  const {data: organizations } = await supabase.from('organizations')
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
  const {data: organizations } = await supabase?.from('organizations').upsert(snakecaseKeys(data)).eq(data.id ? 'id' : 'user_id', data.id ? data.id : userId)
  .select();

  if (organizations) {
    const [organization] = organizations as Organization[];
    return camelcaseKeys(organization) as Organization;
  } else {
    return {} as Organization;
  }
}

export const OrganizationEditForm: React.FC<organizationEditFormProps> = props => {
  const {organization, registrOrganization, organizationErrors, onSubmit, onReset} = props;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true}>
  <div className="row">
    <input type="text" placeholder="Full Name" defaultValue={organization?.fullName} {...registrOrganization("fullName", { required: true })} />
    {organizationErrors.first_name && <span>This field is required</span>}
  </div>
  <div className="row">
    <input type="text" placeholder="Name" defaultValue={organization?.name} {...registrOrganization("name")} />
  </div>
  <div className="row">
    <input type="text" placeholder="Website" defaultValue={organization?.website} {...registrOrganization("website")} />
  </div>
  <div className="row">
    <input type="text" placeholder="Avatar url" defaultValue={organization?.avatarUrl} {...registrOrganization("avatarUrl")} />
  </div>
  <div className="row">
  <input type="submit" className="button button-primary" value="Save" />
  </div>
</form>
}