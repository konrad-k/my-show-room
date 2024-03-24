import React from 'react';
import { Link } from 'react-router-dom'
import Exhibition, { exhibitionValidate } from '../models/exhibition.model';
import Gallery from '../models/gallery.model';
import { EditFormProps } from './EditForm';
import useFileUploader from '../hooks/useFileUploader'
import BeatLoader from "react-spinners/BeatLoader";
import Input from '../components/form/input';

interface ExhibitionProps {
  exhibition: Exhibition;
  gallery?: Gallery;
}

interface ExhibitionEditFormProps extends EditFormProps {
  exhibition: Exhibition | null;
}

interface ExhibitionEditInfoProps {
  exhibition: Exhibition | null;
  handleDeleteClick: (exhibition) => void
  handleEditClick: (exhibition) => void
}

export const ExhibitionTile: React.FC<ExhibitionProps> = ({ exhibition, gallery }) => {
  return <div className="cell">
    <Link className="section display-block" to={`/${gallery?.name || 'test'}/${exhibition.id}`}>
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

export const ExhibitionEditForm: React.FC<ExhibitionEditFormProps> = ({ exhibition, onSubmit, onReset, form }) => {
  const { register, formState: { errors } } = form;
  const { Controller: PosterController, isLoading: imageLoading, imageErrors: posterErrors } = useFileUploader({ name: 'poster', from: 'exhibitions', actor: exhibition, form }, () => { });

  const isLoading = form.formState.isSubmitting || imageLoading;

  const id = exhibition?.id;
  return <form key={exhibition.id || Date.now()} onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    {id && <input type="hidden" {...register("id")} />}
    <Input name="fullName" label="Full name" register={register} validations={exhibitionValidate} errors={errors} />
    <Input name="name" label="Name" register={register} validations={exhibitionValidate} errors={errors} />
    <Input name="description" type="textarea" label="Description" register={register} validations={exhibitionValidate} errors={errors} />
    <Input name="address" type="textarea" label="Address" register={register} validations={exhibitionValidate} errors={errors} />
    <Input name="startAt" label="Start at" type="datetime-local" register={register} validations={exhibitionValidate} errors={errors} />
    <Input name="endAt" label="End at" type="datetime-local" register={register} validations={exhibitionValidate} errors={errors} />
    <Input name="posterUrl" label="Poster URL" register={register} validations={exhibitionValidate} errors={{ ...errors, posterUrl: posterErrors }}>
      <PosterController />
    </Input>
    <div className="row items items-end">
      <button type="submit" className={`button button-primary has-loading ${isLoading ? 'loading' : ''}`}>
        {isLoading && <div className="loading-wrapper"><BeatLoader color="currentColor" size={10} /></div>}
        <span>Save</span>
      </button>
      <input type="reset" className="button button-mute button-s" value="Cancel" />
    </div>
  </form>
}
