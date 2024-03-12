import React from 'react';
import Art from '../models/art.model';
import { EditFormProps } from './EditForm';
import { Link } from 'react-router-dom';
import useFileUploader from '../hooks/useFileUploader'

interface ArtProps {
  art: Art;
}

interface ArtEditFormProps extends EditFormProps {
  art: Art | null;
}

interface ArtEditInfoProps {
  art: Art | null;
  handleDeleteClick: (art) => void
  handleEditClick: (art) => void
}

export const ArtTile: React.FC<ArtProps> = ({ art }) => {
  const id = art?.id;
  return <div className="cell">
    <Link className="section display-block" to={`/exhibitions/${id}`}>
    </Link>
  </div>
}

export const ArtEditInfo: React.FC<ArtEditInfoProps> = ({ art, handleDeleteClick, handleEditClick }) => {
  return <div key={art.id} className="grid grid-form space-2">
    <div className="row">
      <div className="cell-16 items items-end">
        <button className="button button-s button-danger" onClick={() => { handleDeleteClick(art) }}>Delete</button>
        <button className="button button-s" onClick={() => { handleEditClick(art) }}>Edit</button>
      </div>
    </div>
    <div className="row">
      <div className="cell-16">{art?.name}</div>
    </div>
    <div className="row">
      <div className="cell-16">
        <img src={art?.imageUrl} alt={art?.name} />
        <p>{art?.description}</p>
      </div>
    </div>
  </div>
}

export const ArtEditForm: React.FC<ArtEditFormProps> = ({ art, register, errors, onSubmit, onReset, control, watch, setValue }) => {
  const { Controller: ImageController } = useFileUploader({ name: 'image', from: 'arts', actor: art, watch, setValue, control, register }, (url) => {
    if (url) {
      setValue('hdImageUrl', url);
      setValue('posterUrl', url);
    }
  });

  const id = art?.id;
  return <form key={art.id || Date.now()} onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    {id && <input type="hidden" {...register("id")} />}
    <div className="row">
      <label className="cell-6 label">Legal Status:</label>
      <div className="cell-10">
        <input type="text" placeholder="Legal Status" {...register("legalStatus")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Image:</label>
      <div className="cell-10">
        <ImageController/>
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Name" {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Description:</label>
      <div className="cell-10">
        <input type="text" placeholder="Description" {...register("description")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Title:</label>
      <div className="cell-10">
        <input type="text" placeholder="Title" {...register("title")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Style:</label>
      <div className="cell-10">
        <input type="text" placeholder="Style" {...register("style")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Technique:</label>
      <div className="cell-10">
        <input type="text" placeholder="Technique" {...register("technique")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Width:</label>
      <div className="cell-10">
        <input type="number" placeholder="Width" {...register("width")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Height:</label>
      <div className="cell-10">
        <input type="number" placeholder="Height" {...register("height")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Location:</label>
      <div className="cell-10">
        <input type="text" placeholder="Location" {...register("location")} />
      </div>
    </div>
    <div className="row items items-end">
      <input type="submit" className="button button-primary button-s" value="Save" />
      <input type="reset" className="button button-mute button-s" value="Cancel" />
    </div>
  </form>
}
