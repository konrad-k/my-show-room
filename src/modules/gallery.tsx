import React from 'react';
import { Link } from 'react-router-dom'
import Gallery from '../models/gallery.model';
import { EditFormProps } from './EditForm';
import useFileUploader from '../hooks/useFileUploader'
import BeatLoader from "react-spinners/BeatLoader";

interface GalleryProps {
  gallery: Gallery;
}

interface GalleryEditFormProps extends EditFormProps {
  gallery: Gallery | null;
}

interface GalleryEditInfoProps {
  gallery: Gallery | null;
  handleDeleteClick: (gallery) => void
  handleEditClick: (gallery) => void
}

export const GalleryTile: React.FC<GalleryProps> = ({ gallery }) => {
  return <div className="cell">
    <Link className="section display-block" to={`/${gallery.name}`}>
      <img src={gallery?.logoUrl} alt={gallery?.name} />
    </Link>
  </div>
}

export const GalleryEditInfo: React.FC<GalleryEditInfoProps> = ({ gallery, handleDeleteClick, handleEditClick }) => {
  return <div key={gallery.id} className="grid grid-form space-2">
    <div className="row">
      <div className="cell-16 items items-end">
        <Link to={`/profile/galleries/${gallery.id}`}>Exibitions</Link>
        <button className="button button-s button-danger" onClick={() => { handleDeleteClick(gallery) }}>Delete</button>
        <button className="button button-s" onClick={() => { handleEditClick(gallery) }}>Edit</button>
      </div>
    </div>
    <div className="row">
      <div className="cell-16">{gallery?.logoUrl && <img src={gallery?.logoUrl} />}</div>
    </div>
    <div className="row">
      <div className="cell-16">{gallery?.fullName}</div>
    </div>
    <div className="row">
      <div className="cell-16">{gallery?.name}</div>
    </div>
    <div className="row">
      <div className="cell-16">{gallery?.description}</div>
    </div>
    <div className="row">
      <div className="cell-16"><address>{gallery?.address}</address></div>
    </div>
  </div>
}

export const GalleryEditForm: React.FC<GalleryEditFormProps> = ({ gallery, onSubmit, onReset, form }) => {
  const { register, formState: { errors } } = form;
  const { Controller: ImageController, loading } = useFileUploader({ name: 'logo', from: 'galleries', actor: gallery, form }, () => {});
  const id = gallery?.id;
  return <form key={gallery.id || Date.now()} onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    {id && <input type="hidden" {...register("id")} />}
    <div className="row">
      <label className="cell-6 label">Full Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Full Name" {...register("fullName", { required: true })} />
        {errors.fullName && <span>This field is required</span>}
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Name" {...register("name")} />
        {errors.name && <span>This field is required</span>}
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Description:</label>
      <div className="cell-10">
        <input type="text" placeholder="description" {...register("description")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Address:</label>
      <div className="cell-10">
        <input type="text" placeholder="address" {...register("address")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Logo URL:</label>
      <div className="cell-10">
        <ImageController/>
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Style:</label>
      <div className="cell-10">
        <textarea placeholder="style" {...register("style")} />
      </div>
    </div>
    <div className="row items items-end">
      <button type="submit" className={`button button-primary has-loading ${loading ? 'loading' : ''}`}>
        {loading && <div className="loading-wrapper"><BeatLoader color="currentColor" size={10} /></div> }
        <span>Save</span>
      </button>
      <input type="reset" className="button button-mute button-s" value="Cancel" />
    </div>
  </form>
}
