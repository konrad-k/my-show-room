import React from 'react';
import { useSessionUserContext } from '../../contexts/SessionUser';
import { useForm, FieldValues } from "react-hook-form";
import { useEffect, useState } from 'react';
import { Gallery } from "../../models/gallery.model";
import { Organization } from "../../models/organization.model";
import { Profile } from "../../models/profile.model";

import { GalleryEditForm, GalleryEditInfo } from "../../modules/gallery";
import { uploadGallery, deleteGallery, getGalleries } from "../../services/gallery";

import { OrganizationEditForm } from "../../modules/organization";
import { getOrganization, uploadOrganization } from "../../services/organization";

import { ProfileEditForm } from "../../modules/profile";
import { getProfile, uploadProfile } from "../../services/profile";

const galleryLimit = process.env.GALLERY_LIMIT;

const ProfileIndex: React.FC = () => {
  const { sessionUser, setSessionUser } = useSessionUserContext();
  const [profile, setProfile] = useState<Profile>(sessionUser?.profile);
  const [organization, setOrganization] = useState<Organization>(sessionUser?.organization);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [galleryEditing, setGalleryEditing] = useState<Gallery | null>(null);

  const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: { errors: profileErrors, isValid: isValidProfile }, reset: profileReset } = useForm();
  const { register: registerOrganization, handleSubmit: handleSubmitOrganization, formState: { errors: organizationErrors, isValid: isValidOrganization }, reset: organizationReset } = useForm();
  const { register: registerGallery, handleSubmit: handleSubmitGallery, formState: { errors: galleryErrors, isValid: isValidGallery }, reset: galleryReset } = useForm({ defaultValues: {} });

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

  const onProfileSubmit = (data: FieldValues) => {
    if (isValidProfile) {
      uploadProfile(data, sessionUser?.user.id).then((profile) => {
        if (profile) {
          setProfile(profile);
          setSessionUser({ ...sessionUser, ...{ profile: profile } });
        }
      })
    }
  }

  const onOrganizationSubmit = (data: FieldValues) => {
    if (isValidOrganization) {
      uploadOrganization(data, sessionUser?.user.id).then((organization) => {
        if (organization) {
          setOrganization(organization)
          setSessionUser({ ...sessionUser, ...{ organization: organization } });
        }
      })
    }
  }

  const onGallerySubmit = (data: FieldValues) => {
    if (isValidGallery) {
      uploadGallery(data, sessionUser?.user.id).then(({ gallery: updatedGallery, error }) => {
        if (error?.message) {
          console.log(error.message);
        } else {
          galleryReset();
          setGalleryEditing(null);
          if (galleries?.length) {
            let newGalleries = galleries;
            if (data?.id === updatedGallery.id) {
              newGalleries = galleries.map((el) => { return el.id === updatedGallery.id ? updatedGallery : el });
            } else {
              newGalleries.push(updatedGallery);
            }
            setGalleries([...newGalleries]);
            setSessionUser({ ...sessionUser, ...{ galleries: newGalleries } });
          } else {
            setGalleries([updatedGallery]);
            setSessionUser({ ...sessionUser, ...{ galleries: [updatedGallery] } });
          }
        }
      });
    }
  }

  const handleAddGallery = () => {
    galleryReset({});
    setGalleryEditing({} as Gallery);
  }

  const handleEditGalleryClick = (gallery: Gallery) => {
    galleryReset(gallery);
    setGalleryEditing(gallery);
  }

  const handleGalleryReset = () => {
    galleryReset({});
    setGalleryEditing(null);
  }

  const handleDeleteGalleryClick = (data: Gallery) => {
    if (data.id) {
      deleteGallery(data.id, sessionUser?.user.id).then(({ gallery, error }) => {
        if (error?.message) {
          console.log(error.message);
        } else if (galleries) {
          setGalleries(galleries.filter((el) => { return el.id !== gallery.id && el }));
          setSessionUser({ ...sessionUser, ...{ galleries: galleries } });
        }
      });
    }
  }

  return <div className="profile">{sessionUser?.profile ? (
    <h2>Profile</h2>
  ) : <>
    <h1>Hello there!</h1>
    <h2>Until we start, we need some profile info from you:</h2>
  </>}
    <ProfileEditForm onReset={profileReset} profile={profile} onSubmit={handleSubmitProfile(onProfileSubmit)} register={registerProfile} errors={profileErrors} />
    <hr className="margin-top-4" />
    {sessionUser && sessionUser?.organization ? (
      <h2>Organization</h2>
    ) : (
      <h1>Ok, now we need your organization</h1>
    )
    }
    <OrganizationEditForm onReset={organizationReset} organization={organization} onSubmit={handleSubmitOrganization(onOrganizationSubmit)} register={registerOrganization} errors={organizationErrors} />
    <hr className="margin-top-4" />
    <h2>Galleries</h2>
    {
      galleries.map((gallery, galleryKey) => (
        galleryEditing && galleryEditing.id === gallery.id ? (
          <div key={gallery.id} className="section with-padding gallery gallery-form">
            <div className="section-header">edit: {galleryEditing.name}</div>
            <div className="section-content">
              <GalleryEditForm key={galleryKey} gallery={galleryEditing} onSubmit={handleSubmitGallery(onGallerySubmit)} onReset={handleGalleryReset} register={registerGallery} errors={galleryErrors} />
            </div>
          </div>
        ) : (
          <div className="section with-padding gallery-info">
            <div className="section-content">
              <GalleryEditInfo gallery={gallery} handleDeleteClick={handleDeleteGalleryClick} handleEditClick={handleEditGalleryClick} />
            </div>
          </div>
        )
      ))
    }
    {
      galleryEditing && !galleryEditing.id ? (
        <div key="new" className="section with-padding gallery gallery-form">
          <div className="section-header">New Gallery</div>
          <div className="section-content">
            <GalleryEditForm gallery={galleryEditing} onSubmit={handleSubmitGallery(onGallerySubmit)} onReset={handleGalleryReset} register={registerGallery} errors={galleryErrors} />
          </div>
        </div>
      ) : null
    }
    {
      !galleryEditing && galleries.length < parseInt(galleryLimit) && <button onClick={handleAddGallery} className="button">Add new gallery</button>
    }
  </div>
}

export default ProfileIndex;
