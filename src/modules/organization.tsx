import React from 'react';
import { Organization } from "../models/organization.model";
import { EditFormProps } from "./EditForm";

interface organizationEditFormProps extends EditFormProps {
  organization: Organization;
}

export const OrganizationEditForm: React.FC<organizationEditFormProps> = props => {
  const { organization, register, errors, onSubmit, onReset } = props;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    <div className="row">
      <label className="cell-6 label">Full Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Full Name" defaultValue={organization?.fullName} {...register("fullName", { required: true })} />
        {errors.fullName && <span>This field is required</span>}
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Name" defaultValue={organization?.name} {...register("name")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Website:</label>
      <div className="cell-10">
        <input type="text" placeholder="Website" defaultValue={organization?.website} {...register("website")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Avatar url:</label>
      <div className="cell-10">
        <input type="text" placeholder="Avatar url" defaultValue={organization?.avatarUrl} {...register("avatarUrl")} />
      </div>
    </div>
    <div className="row">
      <input type="submit" className="button button-primary" value="Save" />
    </div>
  </form>
}