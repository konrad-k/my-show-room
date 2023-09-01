import React from 'react';
import { Organization } from "../models/organization.model";
import { EditFormProps } from "./EditForm";

interface organizationEditFormProps extends EditFormProps {
  organization: Organization;
}

export const OrganizationEditForm: React.FC<organizationEditFormProps> = props => {
  const {organization, registr, errors, onSubmit, onReset} = props;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true}>
    <div className="row">
      <input type="text" placeholder="Full Name" defaultValue={organization?.fullName} {...registr("fullName", { required: true })} />
      {errors.firstName && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Name" defaultValue={organization?.name} {...registr("name")} />
    </div>
    <div className="row">
      <input type="text" placeholder="Website" defaultValue={organization?.website} {...registr("website")} />
    </div>
    <div className="row">
      <input type="text" placeholder="Avatar url" defaultValue={organization?.avatarUrl} {...registr("avatarUrl")} />
    </div>
    <div className="row">
    <input type="submit" className="button button-primary" value="Save" />
    </div>
  </form>
}