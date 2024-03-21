import React from 'react';
import { Link } from 'react-router-dom'
import Gallery, { galleryValidate } from '../models/gallery.model';
import { EditFormProps } from './EditForm';
import useFileUploader from '../hooks/useFileUploader'
import BeatLoader from "react-spinners/BeatLoader";
import Input from '../components/form/input';

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
  const { Controller: ImageController, isLoading: imageLoading, imageErrors } = useFileUploader({ name: 'logo', from: 'galleries', actor: gallery, form }, () => { });
  const id = gallery?.id;

  const isLoading = form.formState.isSubmitting || imageLoading;

  return <form key={gallery.id || Date.now()} onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    {id && <input type="hidden" {...register("id")} />}
    <Input name="fullName" label="Full name" register={register} validations={galleryValidate} errors={errors} />
    <Input name="name" label="Name" register={register} validations={galleryValidate} errors={errors} />
    <Input name="description" type="textarea" label="Description" register={register} validations={galleryValidate} errors={errors} />
    <Input name="address" type="textarea" label="Address" register={register} validations={galleryValidate} errors={errors} />
    <Input name="logoUrl" label="logo" register={register} validations={galleryValidate} errors={{ ...errors, imageUrl: imageErrors }}>
      <ImageController />
    </Input>
    <Input name="style" label="Style" type="textarea" register={register} validations={galleryValidate} errors={errors} />
    <div className="row items items-end">
      <button type="submit" className={`button button-primary has-loading ${isLoading ? 'loading' : ''}`}>
        {isLoading && <div className="loading-wrapper"><BeatLoader color="currentColor" size={10} /></div>}
        <span>Save</span>
      </button>
      <input type="reset" className="button button-mute button-s" value="Cancel" />
    </div>
  </form>
}
