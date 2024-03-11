import React from 'react';
import { useSessionUserContext } from '../../contexts/SessionUser';
import { useForm, FieldValues } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Art } from "../../models/art.model";
import { Exhibition } from "../../models/exhibition.model";

import { ArtEditForm, ArtEditInfo } from "../../modules/art";
import { getExhibition } from "../../services/exhibition";
import { uploadArt, deleteArt, getArts } from "../../services/art";

const artsLimit = process.env.ARTS_LIMIT;

const ProfileArt: React.FC = () => {
  const { id } = useParams();
  const [exhibition, setExhibition] = useState<Exhibition>(null);
  const { sessionUser, setSessionUser } = useSessionUserContext();
  const [arts, setArts] = useState<Art[]>([]);
  const [artEditing, setArtEditing] = useState<Art | null>(null);

  const { control, watch, setValue, register: registerArt, unregister, handleSubmit: handleSubmitArt, formState: { errors: artErrors, isValid: isValidArt }, reset: artReset } = useForm({ defaultValues: {} });

  useEffect(() => {
    getExhibition(id).then(({ exhibition }) => {
      if (exhibition && exhibition.id) {
        setExhibition(exhibition);
        getArts(exhibition.id).then(({ arts }) => {
          if (arts) {
            setArts(arts);
          }
        });
      }
    });
  }, []);


  const onArtSubmit = (data: FieldValues) => {
    if (isValidArt) {
      delete data.image;
      
      uploadArt(data, id).then(({ art: updatedArt, error }) => {
        if (error?.message) {
          console.log(error.message);
        } else {
          artReset();
          setArtEditing(null);
          if (arts?.length) {
            let newArts = arts;
            if (data?.id === updatedArt.id) {
              newArts = arts.map((el) => { return el.id === updatedArt.id ? updatedArt : el });
            } else {
              newArts.push(updatedArt);
            }
            setArts([...newArts]);
          } else {
            setArts([updatedArt]);
          }
        }
      });
    }
  }

  const handleAddArt = () => {
    artReset({});
    setArtEditing({} as Art);
  }

  const handleEditClick = (art: Art) => {
    artReset(art);
    setArtEditing(art);
  }

  const handleArtReset = () => {
    artReset({});
    setArtEditing(null);
  }

  const handleDeleteClick = (data: Art) => {
    if (data.id) {
      deleteArt(data.id).then(({ art, error }) => {
        if (error?.message) {
          console.log(error.message);
        } else if (arts) {
          setArts(arts.filter((el) => { return el.id !== art.id && el }));
          setSessionUser({ ...sessionUser, ...{ arts: arts } });
        }
      });
    }
  }

  return exhibition && <div className="profile">
    <h2>Arts of `{exhibition.fullName}` exhibition</h2>
    {
      arts.map((art, artKey) => (
        artEditing && artEditing.id === art.id ? (
          <div key={art.id} className="section with-padding art art-form">
            <div className="section-header">edit: {artEditing.name}</div>
            <div className="section-content">
              <ArtEditForm key={artKey} art={artEditing} unregister={ unregister } onSubmit={handleSubmitArt(onArtSubmit)} onReset={handleArtReset} register={registerArt} errors={artErrors} setValue={setValue} control={control} watch={watch} />
            </div>
          </div>
        ) : (
            <div key={art.id} className="section with-padding art-info">
            <div className="section-content">
              <ArtEditInfo art={art} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
            </div>
          </div>
        )
      ))
    }
    {
      artEditing && !artEditing.id ? (
        <div key="new" className="section with-padding art art-form">
          <div className="section-header">New Art</div>
          <div className="section-content">
            <ArtEditForm art={artEditing} onSubmit={handleSubmitArt(onArtSubmit)} onReset={handleArtReset} register={registerArt} errors={artErrors} setValue={setValue} control={control} />
          </div>
        </div>
      ) : null
    }
    {
      !artEditing && arts.length < parseInt(artsLimit) && <button onClick={handleAddArt} className="button">Add new art</button>
    }
  </div>
}

export default ProfileArt;
