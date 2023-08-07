import React from 'react';
import Organization from "../models/organization.model";

interface organizationEditFormProps {
  organization: Organization;
  registrOrganization: any;
  organizationErrors: any;
  onSubmit: any;
  onReset?: any;
}

export const OrganizationEditForm: React.FC<organizationEditFormProps> = props => {
  const {organization, registrOrganization, organizationErrors, onSubmit, onReset} = props;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true}>
    <div className="row">
      <input type="text" placeholder="Full Name" defaultValue={organization?.fullName} {...registrOrganization("fullName", { required: true })} />
      {organizationErrors.firstName && <span>This field is required</span>}
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