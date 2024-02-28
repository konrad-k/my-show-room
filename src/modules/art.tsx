import React from 'react';
import { Art } from "../models/art.model";
import { EditFormProps } from "./EditForm";
import { Link } from "react-router-dom"


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
      <div className="cell-16">{art?.description}</div>
    </div>
  </div>
}

export const ArtEditForm: React.FC<ArtEditFormProps> = ({ art, registr, errors, onSubmit, onReset }) => {
  const id = art?.id;
  return <form key={art.id || Date.now()} onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    {id && <input type="hidden" {...registr("id")} />}
    <div className="row">
      <label className="cell-6 label">Legal Status:</label>
      <div className="cell-10">
        <input type="text" placeholder="Legal Status" {...registr("legalStatus")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Image URL:</label>
      <div className="cell-10">
        <input type="text" placeholder="Image URL" {...registr("imageUrl")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">HD Image URL:</label>
      <div className="cell-10">
        <input type="text" placeholder="HD Image URL" {...registr("hdImageUrl")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Poster URL:</label>
      <div className="cell-10">
        <input type="text" placeholder="Poster URL" {...registr("posterUrl")} />
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
        <input type="text" placeholder="Description" {...registr("description")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Title:</label>
      <div className="cell-10">
        <input type="text" placeholder="Title" {...registr("title")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Style:</label>
      <div className="cell-10">
        <input type="text" placeholder="Style" {...registr("style")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Technique:</label>
      <div className="cell-10">
        <input type="text" placeholder="Technique" {...registr("technique")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Width:</label>
      <div className="cell-10">
        <input type="number" placeholder="Width" {...registr("width")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Height:</label>
      <div className="cell-10">
        <input type="number" placeholder="Height" {...registr("height")} />
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Location:</label>
      <div className="cell-10">
        <input type="text" placeholder="Location" {...registr("location")} />
      </div>
    </div>
    <div className="row items items-end">
      <input type="submit" className="button button-primary button-s" value="Save" />
      <input type="reset" className="button button-mute button-s" value="Cancel" />
    </div>
  </form>
}
