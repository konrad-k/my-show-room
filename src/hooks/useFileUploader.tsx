import { useState } from 'react';
import { Controller } from 'react-hook-form';
import React, { useEffect } from 'react';
import api from "../utils/Api"
import { v4 as uuidv4 } from 'uuid';
import FadeLoader from "react-spinners/FadeLoader";

const useFileUploader = ({ name, from, actor, form }, onChange) => {

  const { control, watch, setValue, register } = form;
  const image = watch(name);
  const imagePreview = image ? URL.createObjectURL(image) : null;

  const [publicUrl, setPublicUrl] = useState(null)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleOnChange = (image) => {
    if (image) {
      setLoading(true);
      const fileName = uuidv4();
      const ext = image.name.substr(image.name.lastIndexOf('.') + 1);
      api.storage.from(from).upload(`${actor.id}/${fileName}.${ext}`, image).then(({ data: image, error }) => {
        if (error) {
          setErrors(error);
          setLoading(false);
        } else {
          const { data: publicImage } = api
            .storage
            .from(from)
            .getPublicUrl(image.path);
          onChange(publicImage.publicUrl, image.path);
          setPublicUrl(publicImage.publicUrl);
          setValue(`${name}Url`, publicImage.publicUrl);
          setValue(`${name}Path`, image.path);
          setLoading(false);
        }

      })
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const renderController = () => {
    return <label className={`file-loader has-loading ${loading ? 'loading' : ''}`}>
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
      {loading && <div className="loading-wrapper"><FadeLoader color="#000" /></div>}
      {imagePreview && !errors && <img src={imagePreview} alt="preview" />}
      {!imagePreview && !errors && actor[`${name}Url`] && <img src={actor[`${name}Url`]} alt="preview" />}
    </label>
  }





  return {
    image,
    imagePreview,
    Controller: renderController,
    publicUrl,
    loading,
    imageErrors: errors
  };
}

export default useFileUploader;