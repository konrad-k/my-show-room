import React from 'react';
import { Gallery } from "../models/gallery.model";
import { EditFormProps } from "./EditForm";
import { Link } from "react-router-dom"


interface GalleryProps {
  gallery: Gallery;
}

interface GalleryEditFormProps extends EditFormProps {
  gallery: Gallery | null;
}

export const GalleryTile: React.FC<GalleryProps> = ({ gallery }) => {
  const id = gallery?.id;
  return <div className="cell">
    <Link className="section display-block" to={`/exhibitions/${id}`}>
      <img src={gallery?.logoUrl} alt={gallery?.name} />
    </Link>
  </div>
}

export const GalleryEditForm: React.FC<GalleryEditFormProps> = ({ gallery, registr, errors, onSubmit, onReset }) => {
  const id = gallery?.id;
  return <form key={gallery.id || Date.now()} onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    {id && <input type="hidden" {...registr("id")} />}
    <div className="row">
      <label className="cell-6 label">Full Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Full Name" {...registr("fullName", { required: true })} />
        {errors.fullName && <span>This field is required</span>}
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Name" {...registr("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Description:</label>
      <div className="cell-10">
        <input type="text" placeholder="description" {...registr("description")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Address:</label>
      <div className="cell-10">
        <input type="text" placeholder="address" {...registr("address")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Logo URL:</label>
      <div className="cell-10">
        <input type="text" placeholder="logoUrl" {...registr("logoUrl")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Style:</label>
      <div className="cell-10">
        <textarea placeholder="style" {...registr("style")} />
      </div>
    </div>
    <div className="row items items-end">
      <input type="submit" className="button button-primary button-s" value="Save" />
      <input type="reset" className="button button-mute button-s" value="Cancel" />
    </div>
  </form>
}
