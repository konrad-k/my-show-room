import api from "../utils/Api"
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import Gallery from "../models/gallery.model";

export const uploadGallery = async (data: Gallery, userId: string) => {
  const uploadData = {userId: userId, ...data}
  const {data: selectData, error} = await api!.from('galleries').upsert(snakecaseKeys(uploadData)).eq(data.id ? 'id' : 'user_id', data.id ? data.id : userId).eq('status', 'active')
  .select();
  if (selectData) {
    return { gallery: camelcaseKeys(selectData[0]) as Gallery, error: error }
  } else {
    return { gallery: {} as Gallery, error: error }
  }
}

export const deleteGallery = async (id: number, userId: string) => {
  const {data: selectData, error} = await api!.from('galleries').update({status: 'deleted'}).eq('id', id).eq('user_id', userId).eq('status', 'active')
  .select();
  
  if (selectData) {
    return { galleries: camelcaseKeys(selectData) as Gallery[], error: error }
  } else {
    return { galleries: [] as Gallery[], error: error }
  }
}

export const getGalleries = async (userId: string) => {
  const {data: selectData, error} = await api!.from('galleries').select().eq('user_id', userId).eq('status', 'active');
  
  if (selectData) {
    return { galleries: camelcaseKeys(selectData) as Gallery[], error: error }
  } else {
    return { galleries: [] as Gallery[], error: error }
  }
}

export const getGallery = async (id: number) => {
  const {data: selectData, error} = await api!.from('galleries').select().eq('id', id).eq('status', 'active');

  if (selectData) {
    return { galleries: camelcaseKeys(selectData) as Gallery[], error: error }
  } else {
    return { galleries: [] as Gallery[], error: error }
  }
}