import React from 'react';
import { useSessionUserContext } from '../../contexts/SessionUser';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import Gallery from "../../models/gallery.model";
import Organization from "../../models/organization.model";
import Profile from "../../models/profile.model";

import { GalleryEditForm } from "../../modules/gallery";
import { uploadGallery, deleteGallery, getGalleries } from "../../services/gallery";

import { OrganizationEditForm } from "../../modules/organization";
import { getOrganization, uploadOrganization } from "../../services/organization";

import  { ProfileEditForm } from "../../modules/profile";
import  { getProfile, uploadProfile } from "../../services/profile";

const ProfileUpdate: React.FC = () => {
  const {sessionUser, setSessionUser} = useSessionUserContext();
  const [profile, setProfile] = useState<Profile>(sessionUser?.user.profile || {});
  const [organization, setOrganization] = useState<Organization>(sessionUser?.user.organization || {});
  const [galleries, setGalleries] = useState<Gallery[]>(sessionUser?.user.galleries || []);
  const [galleryEditing, setGalleryEditing] = useState<Gallery>({} as Gallery);

  const { register: registrProfile, handleSubmit, formState: { errors: profileErrors, isValid: isValidProfile }, reset: profileReset } = useForm();
  const { register: registrOrganization, handleSubmit: handleSubmitOrganization, formState: { errors: organizationErrors, isValid: isValidOrganization }, reset: organizationReset } = useForm();
  const { register: registrGallery, handleSubmit: handleSubmitGallery, formState: { errors: galleryErrors, isValid: isValidGallery } } = useForm();


  useEffect(() => {
    getProfile(sessionUser?.user.id).then((profile) => {
      setProfile(profile);
      profileReset(profile);
    });
  }, []);
  
  useEffect(() => {
    getOrganization(sessionUser?.user.id).then((organization) => {
      setOrganization(organization);
      organizationReset(organization);
    });
  }, []);

  useEffect(() => {
    getGalleries(sessionUser?.user.id).then(({ galleries }) => {
      if (galleries) {
        setGalleries(galleries);
      }
    });
  }, []);

  const onProfileSubmit = (data: any) => {
    if (isValidProfile) {
      uploadProfile(data, sessionUser?.user.id).then((profile) => {
        if (profile) {
          setProfile(profile)
          setSessionUser({...sessionUser, ...{profile: profile}})
        }
      })
    }
  }

  const onOrganizationSubmit = (data: Organization) => {
    if (isValidOrganization) {
      uploadOrganization(data, sessionUser?.user.id).then((organization) => {
        if (organization) {
          setOrganization(organization)
          setSessionUser({...sessionUser, ...{organization: organization}})
        }
      })
    }
  }

  const onGallerySubmit = (data: any) => {
    if (isValidGallery) {
      uploadGallery(data, sessionUser?.user.id).then(({ gallery: updatedGallery, error }) => {
        if (error?.message) {
          console.log(error.message);
        } else if (galleries?.length) {
          setGalleryEditing({} as Gallery);
          const newGalleries = galleries.map((el) => { return el.id == updatedGallery.id ? updatedGallery : el });
          setGalleries(newGalleries);
          setSessionUser({...sessionUser, ...{galleries: newGalleries}});
        }
      });
    }
  }

  const handleAddGallery = () => {
    setGalleries([...galleries, {} as Gallery]);
  }

  const handleEditClick = (gallery: Gallery) => {
    setGalleryEditing(gallery);
  }

  const handleDeleteClick = (gallery: Gallery) => {
    if (gallery.id) {
      deleteGallery(gallery.id, sessionUser?.user.id).then(({ galleries, error }) => {
        if (error?.message) {
          console.log(error.message);
        } else if (galleries?.length) {
          setGalleries(galleries);
          setSessionUser({...sessionUser, ...{galleries: galleries}});
        }
      });
    }
  }

  const handleResetGallery = () => {
    setGalleries([...galleries.filter((g) => g?.id)] as Gallery[]);
    setGalleryEditing({} as Gallery);
  }

  return <>{ sessionUser?.profile ? (
    <>Edit your profile:</>
      ) : <>
      <h1>Hello there!</h1>
      <h3>Until we start, we need some profile info from you:</h3>
    </> }
    <ProfileEditForm profile={profile} onSubmit={handleSubmit(onProfileSubmit)} registrProfile={registrProfile} profileErrors={profileErrors}/>

    { sessionUser && sessionUser?.organization ? (
        <>Your organization</>
      ) : (
        <h1>Ok, now we need your organization</h1>
      )
    }

    <OrganizationEditForm organization={organization} onSubmit={handleSubmitOrganization(onOrganizationSubmit)} registrOrganization={registrOrganization} organizationErrors={organizationErrors}/>
    <ul>
      {
        galleries.map((gallery, galleryKey) => (
          gallery?.id && galleryEditing?.id != gallery?.id ? (
            <li key={gallery.id}>
              <p><button className="button button-s"  onClick={() => {handleDeleteClick(gallery) }}>delete</button><button  className="button button-s" onClick={() => {handleEditClick(gallery) }}>edit</button></p>
              <p>full name: {gallery?.fullName}</p>
              <p>name: {gallery?.name}</p>
              <p>description: {gallery?.description}</p>
              <p>address: {gallery?.address}</p>
              <p>logo: <img src={gallery?.logoUrl}/></p>
            </li>
          ) : (
            <GalleryEditForm key={galleryKey} galleryEditing={galleryEditing} gallery={gallery} onSubmit={handleSubmitGallery(onGallerySubmit)} onReset={handleResetGallery} registrGallery={registrGallery} galleryErrors={galleryErrors}/>
          )
        ))
      }
    </ul>
    {
      (typeof galleries?.findLast(() => true)?.id !== 'undefined' || galleries.length === 0) && <button onClick={handleAddGallery} className="button">Add new gallery</button>
    }
    
  </>
  
}

export default ProfileUpdate;
