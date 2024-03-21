import React from 'react';
import { Link } from 'react-router-dom';
import Art, { artValidate } from '../models/art.model';
import { EditFormProps } from './EditForm';
import useFileUploader from '../hooks/useFileUploader'
import BeatLoader from "react-spinners/BeatLoader";
import { useTranslation } from "react-i18next";
import Input from '../components/form/input';

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

export const ArtEditForm: React.FC<ArtEditFormProps> = ({ art, onSubmit, onReset, form }) => {
  const { t } = useTranslation();
  const { setValue, register, formState: { errors } } = form;
  const { Controller: ImageController, isLoading: imageLoading, imageErrors } = useFileUploader({ name: 'image', from: 'arts', actor: art, form }, (url) => {
    if (url) {
      setValue('hdImageUrl', url);
      setValue('posterUrl', url);
    }
  });

  const isLoading = form.formState.isSubmitting || imageLoading;

  const id = art?.id;
  return <form key={art.id || Date.now()} onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2">
    {id && <input type="hidden" {...register("id")} />}
    <Input name="name" label="Name" register={register} validations={artValidate} errors={errors} />
    <Input name="imageUrl" label="Image" register={register} validations={artValidate} errors={{ ...errors, imageUrl: imageErrors }}>
      <ImageController />
    </Input>
    <Input name="description" type="textarea" label="Description" register={register} validations={artValidate} errors={errors} />
    <Input name="title" label="Title" register={register} validations={artValidate} errors={errors} />
    <Input name="style" label="Style" register={register} validations={artValidate} errors={errors} />
    <Input name="technique" label="Technique" register={register} validations={artValidate} errors={errors} />
    <Input name="width" label="Width" register={register} validations={artValidate} errors={errors} />
    <Input name="height" label="Height" register={register} validations={artValidate} errors={errors} />
    <div className="row items items-end">
      <button type="submit" className={`button button-primary has-loading ${isLoading ? 'loading' : ''}`}>
        {isLoading && <div className="loading-wrapper"><BeatLoader color="currentColor" size={10} /></div>}
        <span>Save</span>
      </button>
      <input type="reset" className="button button-mute button-s" value="Cancel" />
    </div>
  </form>
}
