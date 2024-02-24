import api from "../utils/Api"
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { Gallery } from "../models/gallery.model";
import { FieldValues } from "react-hook-form";

export const uploadGallery = async (data: FieldValues, userId: string) => {
  const uploadData = { userId: userId, ...data }
  const { data: galleries, error } = await api!.from('galleries').upsert(snakecaseKeys(uploadData)).eq((data && data.id) ? 'id' : 'user_id', (data && data.id) ? data.id : userId).eq('status', 'active')
    .select();
  return { gallery: returnOneGallery(galleries as Gallery[]), error: error };
}

export const deleteGallery = async (id: number, userId: string) => {
  const { data: galleries, error } = await api!.from('galleries').update({ status: 'deleted' }).eq('id', id).eq('user_id', userId).eq('status', 'active')
    .select();

  return { gallery: returnOneGallery(galleries as Gallery[]), error: error };
}

export const getGalleries = async (userId: string) => {
  const { data: galleries, error } = await api!.from('galleries').select().eq('user_id', userId).eq('status', 'active');

  return { galleries: camelcaseKeys(galleries ?? [] as Gallery[]), error: error }
}

export const getGallery = async (id: number) => {
  const { data: galleries, error } = await api!.from('galleries').select().eq('id', id).eq('status', 'active');

  return { galleries: returnOneGallery(galleries as Gallery[]), error: error };
}

function returnOneGallery(galleries: Gallery[]) {
  const [gallery] = galleries ?? [] as Gallery[];
  return camelcaseKeys(gallery ?? {} as Gallery)
}