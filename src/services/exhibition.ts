import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import api from "../utils/Api"
import Exhibition from "../models/exhibition.model";
import { FieldValues } from "react-hook-form";

export const uploadExhibition = async (data: FieldValues, galleryId: string) => {
  const uploadData = { galleryId: galleryId, ...data }
  const { data: exhibitions, error } = await api!.from('exhibitions').upsert(snakecaseKeys(uploadData)).eq((data && data.id) ? 'id' : 'gallery_id', (data && data.id) ? data.id : galleryId).eq('status', 'active')
    .select();
  return { exhibition: returnOneExhibition(exhibitions as Exhibition[]), error: error };
}

export const deleteExhibition = async (id: string) => {
  const { data: exhibitions, error } = await api!.from('exhibitions').update({ status: 'deleted' }).eq('id', id).eq('status', 'active')
    .select();

  return { exhibition: returnOneExhibition(exhibitions as Exhibition[]), error: error };
}

export const getExhibitions = async (galleryId?: string) => {
  if (galleryId) {
    const { data: exhibitions, error } = await api!.from('exhibitions').select().eq('gallery_id', galleryId).eq('status', 'active');
    return { exhibitions: camelcaseKeys(exhibitions ?? [] as Exhibition[]), error: error }
  } else {
    const { data: exhibitions, error } = await api!.from('exhibitions').select().eq('status', 'active');
    return { exhibitions: camelcaseKeys(exhibitions ?? [] as Exhibition[]), error: error }
  }
}

export const getExhibition = async (id: string) => {
  const { data: exhibitions, error } = await api!.from('exhibitions').select().eq('id', id).eq('status', 'active');

  return { exhibition: returnOneExhibition(exhibitions as Exhibition[]), error: error };
}

function returnOneExhibition(exhibitions: Exhibition[]) {
  const [exhibition] = exhibitions ?? [] as Exhibition[];
  return camelcaseKeys(exhibition ?? {} as Exhibition)
}