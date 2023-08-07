import React from 'react';
import Gallery from "../models/gallery.model";

interface GalleryEditFormProps {
  gallery: Gallery;
  galleryEditing: Gallery;
  registrGallery: any;
  galleryErrors: any;
  onSubmit: any;
  onReset: any;
}

export const GalleryEditForm: React.FC<GalleryEditFormProps> = props => {
  const {gallery, galleryEditing, registrGallery, galleryErrors, onSubmit, onReset} = props;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true}>
    { galleryEditing?.id && <input type="hidden" defaultValue={gallery?.id} {...registrGallery("id")} /> }
    <div className="row">
      <input type="text" placeholder="Full Name" defaultValue={gallery?.fullName} {...registrGallery("fullName", { required: true })} />
      {galleryErrors.fullName && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Name" defaultValue={gallery?.name} {...registrGallery("name", { required: true })} />
      {galleryErrors.name && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="description" defaultValue={gallery?.description} {...registrGallery("description")} />
    </div>
    <div className="row">
      <input type="text" placeholder="address" defaultValue={gallery?.address} {...registrGallery("address")} />
    </div>
    <div className="row">
      <input type="text" placeholder="logoUrl" defaultValue={gallery?.logoUrl} {...registrGallery("logoUrl")} />
    </div>
    <div className="row">
      <textarea type="text" placeholder="style" defaultValue={gallery?.style} {...registrGallery("style")} />
    </div>
    <div className="row">
      <input type="submit" className="button button-primary" value="Save" />
      <input type="reset" className="button button-mute" value="Cancel" />
    </div>
  </form>
}
