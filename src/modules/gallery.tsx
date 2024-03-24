import React, { useMemo, useEffect, useState } from 'react';
import { GoogleMap, MarkerF, LoadScript } from "@react-google-maps/api";
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

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const googleMapsZoom = 15;

export const GalleryTile: React.FC<GalleryProps> = ({ gallery }) => {
  return <div className="cell">
    <Link className="section display-block" to={`/${gallery.name}`}>
      <img src={gallery?.logoUrl} alt={gallery?.name} />
    </Link>
  </div>
}

export const GalleryEditInfo: React.FC<GalleryEditInfoProps> = ({ gallery, handleDeleteClick, handleEditClick }) => {

  const galleryPosition = gallery.latitude && gallery.longitude ? useMemo(() => ({ lat: gallery.latitude, lng: gallery.longitude }), []) : false;

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
    <div className="row">
      <div className={`cell-16 ${galleryPosition ? 'has-map' : ''}`}>
        {galleryPosition &&
          (
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            >
              <GoogleMap
                mapContainerClassName="map-container"
                center={galleryPosition}
                zoom={googleMapsZoom}
              >
                <MarkerF position={galleryPosition} />
              </GoogleMap>
            </LoadScript>
          )
        }
      </div>
    </div>
  </div>
}


export const GalleryEditForm: React.FC<GalleryEditFormProps> = ({ gallery, onSubmit, onReset, form }) => {
  const { register, formState: { errors } } = form;
  const { Controller: ImageController, isLoading: imageLoading, imageErrors } = useFileUploader({ name: 'logo', from: 'galleries', actor: gallery, form }, () => { });
  const id = gallery?.id;

  const isLoading = form.formState.isSubmitting || imageLoading;

  const [position, setPosition] = useState({ latitude: gallery.latitude || 50, longitude: gallery.longitude || 10 });

  const setLocation = (position) => {
    form.setValue('latitude', position.latitude);
    form.setValue('longitude', position.longitude);
    setPosition(position);
  }

  const getLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000
    };

    function success(pos) {
      setLocation(pos.coords);
    }

    function error(err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const getLocationFromAddress = () => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: form.getValues('address') }, (results, status) => {
      if (status === 'OK') {
        const position = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng()
        };
        setLocation(position);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  const getLocationFromMap = (e) => {
    const position = {
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng()
    };
    setLocation(position);
  }

  return <form key={gallery.id || Date.now()} onSubmit={onSubmit} onReset={onReset} noValidate={true} className="grid grid-form space-2 gutter-2">
    {id && <input type="hidden" {...register("id")} />}
    <Input name="fullName" label="Full name" register={register} validations={galleryValidate} errors={errors} />
    <Input name="name" label="Name" register={register} validations={galleryValidate} errors={errors} />
    <Input name="description" type="textarea" label="Description" register={register} validations={galleryValidate} errors={errors} />
    <Input name="logoUrl" label="logo" register={register} validations={galleryValidate} errors={{ ...errors, imageUrl: imageErrors }}>
      <ImageController />
    </Input>
    <Input name="style" label="Style" type="textarea" register={register} validations={galleryValidate} errors={errors} />
    <Input name="address" type="textarea" label="Address" register={register} validations={galleryValidate} errors={errors} />
    <div className="row">
      <div className="cell-6">
        <button type="button" className="button button-s block" onClick={() => getLocation()}>Get my browser location</button>
      </div>
      <div className="cell-10">
        <button type="button" className="button button-primary button-s block" onClick={() => getLocationFromAddress()}>Get location from address</button>
      </div>
    </div>
    <div className="row">
      <div className="cell-16 has-map">
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
        >
          <GoogleMap
            mapContainerClassName="map-container"
            center={{ lat: position.latitude, lng: position.longitude }}
            zoom={googleMapsZoom}
          >
            <MarkerF position={{ lat: position.latitude, lng: position.longitude }} visible={true} draggable={true} onDragEnd={(e) => getLocationFromMap(e)} />
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="cell-16"><p>Dragg pin position for adjust.</p></div>

    </div>
    <Input name="latitude" label="Latitude" register={register} validations={galleryValidate} errors={errors} readonly={true} />
    <Input name="longitude" label="Longitude" register={register} validations={galleryValidate} errors={errors} readonly={true} />

    <div className="row items items-end">
      <button type="submit" className={`button button-primary has-loading ${isLoading ? 'loading' : ''}`}>
        {isLoading && <div className="loading-wrapper"><BeatLoader color="currentColor" size={10} /></div>}
        <span>Save</span>
      </button>
      <input type="reset" className="button button-mute button-s" value="Cancel" />
    </div>
  </form>
}
