import supabase from "../utils/Api"
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import Gallery from "../models/gallery.model";

interface GalleryEditFormProps {
  gallery: Gallery;
  galleryEditing: Gallery;
  registrGallery: any;
  galleryErrors: any;
  onSubmit: any;
  onReset: any;
}

export const uploadGallery = async (data: Gallery, userId: string) => {
  const uploadData = {userId: userId, ...data}
  const {data: selectData, error} = await supabase?.from('galleries').upsert(snakecaseKeys(uploadData)).eq(data.id ? 'id' : 'user_id', data.id ? data.id : userId).eq('status', 'active')
  .select();
  if (selectData) {
    return { gallery: camelcaseKeys(selectData[0]) as Gallery, error: error }
  } else {
    return { gallery: {} as Gallery, error: error }
  }
}

export const deleteGallery = async (id: Number, userId: string) => {
  const {data: selectData, error} = await supabase?.from('galleries').update({status: 'deleted'}).eq('id', id).eq('user_id', userId).eq('status', 'active')
  .select();
  
  if (selectData) {
    return { galleries: camelcaseKeys(selectData) as Gallery[], error: error }
  } else {
    return { galleries: [] as Gallery[], error: error }
  }
}

export const getGalleries = async (userId: string) => {
  const {data: selectData, error} = await supabase?.from('galleries').select().eq('user_id', userId).eq('status', 'active');
  
  if (selectData) {
    return { galleries: camelcaseKeys(selectData) as Gallery[], error: error }
  } else {
    return { galleries: [] as Gallery[], error: error }
  }
}

export const getGallery = async (id: Number) => {
  const {data: selectData, error} = await supabase?.from('galleries').select().eq('id', id).eq('status', 'active');

  if (selectData) {
    return { galleries: camelcaseKeys(selectData) as Gallery[], error: error }
  } else {
    return { galleries: [] as Gallery[], error: error }
  }
}

export const GalleryEditForm: React.FC<GalleryEditFormProps> = props => {
  const {gallery, galleryEditing, registrGallery, galleryErrors, onSubmit, onReset} = props;
  return <form onSubmit={onSubmit} onReset={onReset} noValidate={true}>
    { galleryEditing?.id && <input type="hidden" defaultValue={gallery?.id} {...registrGallery("id")} /> }
    <div className="row">
      <input type="text" placeholder="Full Name" defaultValue={gallery?.fullName} {...registrGallery("fullName", { required: true })} />
      {galleryErrors.fullName && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="Name" defaultValue={gallery?.name} {...registrGallery("name", { required: true })} />
      {galleryErrors.name && <span>This field is required</span>}
    </div>
    <div className="row">
      <input type="text" placeholder="description" defaultValue={gallery?.description} {...registrGallery("description")} />
    </div>
    <div className="row">
      <input type="text" placeholder="address" defaultValue={gallery?.address} {...registrGallery("address")} />
    </div>
    <div className="row">
      <input type="text" placeholder="logoUrl" defaultValue={gallery?.logoUrl} {...registrGallery("logoUrl")} />
    </div>
    <div className="row">
      <textarea type="text" placeholder="style" defaultValue={gallery?.style} {...registrGallery("style")} />
    </div>
    <div className="row">
      <input type="submit" className="button button-primary" value="Save" />
      <input type="reset" className="button button-mute" value="Cancel" />
    </div>
  </form>
}
