import React from 'react';
import { useSessionUserContext } from '../../contexts/SessionUser';
import { useForm, FieldValues } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Exhibition from "../../models/exhibition.model";
import Gallery from "../../models/gallery.model";

import { ExhibitionEditForm, ExhibitionEditInfo } from "../../modules/exhibition";
import { getGallery } from "../../services/gallery";
import { uploadExhibition, deleteExhibition, getExhibitions } from "../../services/exhibition";

const exhibitionLimit = process.env.EXHIBITION_LIMIT;

const ProfileExhibition: React.FC = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState<Gallery>(null);
  const { sessionUser, setSessionUser } = useSessionUserContext();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [exhibitionEditing, setExhibitionEditing] = useState<Exhibition | null>(null);

  const { control, watch, setValue, register: registerExhibition, handleSubmit: handleSubmitExhibition, formState: { errors: exhibitionErrors, isValid: isValidExhibition }, reset: exhibitionReset } = useForm({ defaultValues: {} });

  useEffect(() => {
    getGallery({ id: id, userId: sessionUser.id }).then(({ gallery }) => {
      if (gallery && gallery.id) {
        setGallery(gallery);
        getExhibitions(gallery.id.toString()).then(({ exhibitions }) => {
          if (exhibitions) {
            setExhibitions(exhibitions);
          }
        });
      }
    });
  }, []);


  const onExhibitionSubmit = (data: FieldValues) => {
    if (isValidExhibition) {
      delete data.poster;
      uploadExhibition(data, id).then(({ exhibition: updatedExhibition, error }) => {
        if (error?.message) {
          console.log(error.message);
        } else {
          exhibitionReset();
          setExhibitionEditing(null);
          if (exhibitions?.length) {
            let newExhibitions = exhibitions;
            if (data?.id === updatedExhibition.id) {
              newExhibitions = exhibitions.map((el) => { return el.id === updatedExhibition.id ? updatedExhibition : el });
            } else {
              newExhibitions.push(updatedExhibition);
            }
            setExhibitions([...newExhibitions]);
          } else {
            setExhibitions([updatedExhibition]);
          }
        }
      });
    }
  }

  const handleAddExhibition = () => {
    exhibitionReset({});
    setExhibitionEditing({} as Exhibition);
  }

  const handleEditClick = (exhibition: Exhibition) => {
    exhibitionReset(exhibition);
    setExhibitionEditing(exhibition);
  }

  const handleExhibitionReset = () => {
    exhibitionReset({});
    setExhibitionEditing(null);
  }

  const handleDeleteClick = (data: Exhibition) => {
    if (data.id) {
      deleteExhibition(data.id).then(({ exhibition, error }) => {
        if (error?.message) {
          console.log(error.message);
        } else if (exhibitions) {
          setExhibitions(exhibitions.filter((el) => { return el.id !== exhibition.id && el }));
          setSessionUser({ ...sessionUser, ...{ exhibitions: exhibitions } });
        }
      });
    }
  }

  return gallery && <div className="profile">
    <h2>Exhibitions of `{gallery.fullName}` gallery</h2>
    {
      exhibitions.map((exhibition) => (
        exhibitionEditing && exhibitionEditing.id === exhibition.id ? (
          <div key={exhibition.id} className="section with-padding exhibition exhibition-form">
            <div className="section-header">edit: {exhibitionEditing.name}</div>
            <div className="section-content">
              <ExhibitionEditForm
                exhibition={exhibitionEditing}
                onSubmit={handleSubmitExhibition(onExhibitionSubmit)}
                onReset={handleExhibitionReset}
                register={registerExhibition}
                errors={exhibitionErrors}
                control={control}
                watch={watch}
                setValue={setValue}
              />
            </div>
          </div>
        ) : (
          <div key={exhibition.id} className="section with-padding exhibition-info">
            <div className="section-content">
                <ExhibitionEditInfo
                  exhibition={exhibition}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                />
            </div>
          </div>
        )
      ))
    }
    {
      exhibitionEditing && !exhibitionEditing.id ? (
        <div key="new" className="section with-padding exhibition exhibition-form">
          <div className="section-header">New Exhibition</div>
          <div className="section-content">
            <ExhibitionEditForm
              exhibition={exhibitionEditing}
              onSubmit={handleSubmitExhibition(onExhibitionSubmit)}
              onReset={handleExhibitionReset}
              register={registerExhibition}
              errors={exhibitionErrors}
              control={control}
              watch={watch}
              setValue={setValue}
            />
          </div>
        </div>
      ) : null
    }
    {
      !exhibitionEditing && exhibitions.length < parseInt(exhibitionLimit) && <button onClick={handleAddExhibition} className="button">Add new exhibition</button>
    }
  </div>
}

export default ProfileExhibition;
