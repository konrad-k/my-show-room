import React from 'react';
import { Gallery } from "../models/gallery.model";
import { EditFormProps } from "./EditForm";

interface GalleryEditFormProps extends EditFormProps {
  gallery: Gallery | null;
}

export const GalleryEditForm: React.FC<GalleryEditFormProps> = ({gallery, registr, errors, onSubmit, onReset}) => {
  const id = gallery?.id;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true}>
    { gallery?.id && <input type="hidden" defaultValue={id} {...registr("id")} /> }
    <div className="row">
      <input type="text" placeholder="Full Name" defaultValue={gallery?.fullName} {...registr("fullName", { required: true })} />
      {errors.fullName && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Name" defaultValue={gallery?.name} {...registr("name", { required: true })} />
      {errors.name && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="description" defaultValue={gallery?.description} {...registr("description")} />
    </div>
    <div className="row">
      <input type="text" placeholder="address" defaultValue={gallery?.address} {...registr("address")} />
    </div>
    <div className="row">
      <input type="text" placeholder="logoUrl" defaultValue={gallery?.logoUrl} {...registr("logoUrl")} />
    </div>
    <div className="row">
      <textarea type="text" placeholder="style" defaultValue={gallery?.style} {...registr("style")} />
    </div>
    <div className="row">
      <input type="submit" className="button button-primary" value="Save" />
      <input type="reset" className="button button-mute" value="Cancel" />
    </div>
  </form>
}
