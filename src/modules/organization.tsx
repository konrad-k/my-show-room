import React from 'react';
import Organization, { organizationValidate } from "../models/organization.model";
import { EditFormProps } from "./EditForm";
import useFileUploader from '../hooks/useFileUploader'
import BeatLoader from "react-spinners/BeatLoader";
import Input from '../components/form/input';

interface organizationEditFormProps extends EditFormProps {
  organization: Organization;
}

export const OrganizationEditForm: React.FC<organizationEditFormProps> = ({ organization, onSubmit, onReset, form }) => {
  const { register, formState: { errors } } = form;
  const { Controller: ImageController, isLoading, imageErrors } = useFileUploader({ name: 'logo', from: 'organizations', actor: organization, form }, () => { });
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    <Input name="fullName" label="Full name" register={register} validations={organizationValidate} errors={errors} />
    <Input name="name" label="Name" register={register} validations={organizationValidate} errors={errors} />
    <Input name="website" label="Website" register={register} validations={organizationValidate} errors={errors} />
    <Input name="avatarUrl" label="Avatar" register={register} validations={organizationValidate} errors={{ ...errors, imageUrl: imageErrors }}>
      <ImageController />
    </Input>
    <div className="row">
      <button type="submit" className={`button button-primary has-loading ${isLoading ? 'loading' : ''}`}>
        {isLoading && <div className="loading-wrapper"><BeatLoader color="currentColor" size={10} /></div>}
        <span>Save</span>
      </button>
    </div>
  </form>
}