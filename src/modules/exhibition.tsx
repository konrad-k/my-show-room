import React from 'react';
import { Exhibition } from "../models/exhibition.model";
import { EditFormProps } from "./EditForm";
import { Link } from "react-router-dom"


interface ExhibitionProps {
  exhibition: Exhibition;
}

interface ExhibitionEditFormProps extends EditFormProps {
  exhibition: Exhibition | null;
}

interface ExhibitionEditInfoProps {
  exhibition: Exhibition | null;
  handleDeleteClick: (exhibition) => void
  handleEditClick: (exhibition) => void
}

export const ExhibitionTile: React.FC<ExhibitionProps> = ({ exhibition }) => {
  const id = exhibition?.id;
  return <div className="cell">
    <Link className="section display-block" to={`/exhibitions/${id}`}>
      <img src={exhibition?.posterUrl} alt={exhibition?.name} />
    </Link>
  </div>
}

export const ExhibitionEditInfo: React.FC<ExhibitionEditInfoProps> = ({ exhibition, handleDeleteClick, handleEditClick }) => {
  return <div key={exhibition.id} className="grid grid-form space-2">
    <div className="row">
      <div className="cell-16 items items-end">
        <Link to={`/exhibitions/${exhibition.id}`}>Exhibition</Link>
        <Link to={`/profile/exhibitions/${exhibition.id}`}>Arts of Exhibition</Link>
        <button className="button button-s button-danger" onClick={() => { handleDeleteClick(exhibition) }}>Delete</button>
        <button className="button button-s" onClick={() => { handleEditClick(exhibition) }}>Edit</button>
      </div>
    </div>
    <div className="row">
      <div className="cell-16">{exhibition?.posterUrl && <img src={exhibition?.posterUrl} />}</div>
    </div>
    <div className="row">
      <div className="cell-16">{exhibition?.fullName}</div>
    </div>
    <div className="row">
      <div className="cell-16">{exhibition?.name}</div>
    </div>
    <div className="row">
      <div className="cell-16">{exhibition?.description}</div>
    </div>
    <div className="row">
      <div className="cell-16"><address>{exhibition?.address}</address></div>
    </div>
  </div>
}

export const ExhibitionEditForm: React.FC<ExhibitionEditFormProps> = ({ exhibition, registr, errors, onSubmit, onReset }) => {
  const id = exhibition?.id;
  return <form key={exhibition.id || Date.now()} onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    {id && <input type="hidden" {...registr("id")} />}
    <div className="row">
      <label className="cell-6 label">Full Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Full Name" {...registr("fullName", { required: true })} />
        {errors.fullName && <span>{errors.fullName.message.toString()}</span>}
      </div>
    </div>
    <div className="row">
      <label className="cell-6 label">Name:</label>
      <div className="cell-10">
        <input type="text" placeholder="Name" {...registr("name", { required: true })} />
        {errors.name && <span>{errors.name.message.toString()}</span>}
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
      <label className="cell-6 label">Poster URL:</label>
      <div className="cell-10">
        <input type="text" placeholder="posterUrl" {...registr("posterUrl")} />
      </div>
    </div>
    <div className="row items items-end">
      <input type="submit" className="button button-primary button-s" value="Save" />
      <input type="reset" className="button button-mute button-s" value="Cancel" />
    </div>
  </form>
}
