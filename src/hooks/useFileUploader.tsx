import { useState } from 'react';
import { Controller } from 'react-hook-form';
import React, { useEffect } from 'react';
import api from "../utils/Api"
import { v4 as uuidv4 } from 'uuid';


const useFileUploader = ({ name, from, actor, watch, setValue, control, register }, onChange) => {

  const image = watch(name);
  const imagePreview = image ? URL.createObjectURL(image) : null;

  const [ publicUrl, setPublicUrl ] = useState(null)
  const handleOnChange = (image) => {
    if (image) {
      const fileName = uuidv4();
      const ext = image.name.substr(image.name.lastIndexOf('.') + 1);
      api.storage.from(from).upload(`${actor.id}/${fileName}.${ext}`, image).then(({ data: image }) => {
        const { data: publicImage } = api
          .storage
          .from(from)
          .getPublicUrl(image.path);
        onChange(publicImage.publicUrl, image.path);
        setPublicUrl(publicImage.publicUrl);
        setValue(`${name}Url`, publicImage.publicUrl);
        setValue(`${name}Path`, image.path);
      });
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const renderController = () => {
    return <>
      <Controller 
      name={name}
          control={control}
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <>
              <input type="hidden" {...register(`${name}Url`)} />
              <input type="hidden" {...register(`${name}Path`)} />
              <input
                type="file"
                ref={ref}
                name={name}
                onBlur={onBlur}
                onChange={(e) => { onChange(e.target.files?.[0]); handleOnChange(e.target.files?.[0]) }}
              />
            </>
        )}
      />
        {imagePreview && <img src={imagePreview} alt="preview" />}
        {!imagePreview && actor[`${name}Url`] && <img src={actor[`${name}Url`]} alt="preview" />}
      </>
      }
  

  


  return {
    image,
    imagePreview,
    Controller: renderController,
    publicUrl
  };
}

export default useFileUploader;