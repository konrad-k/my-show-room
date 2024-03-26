import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import api from "../utils/Api"
import Art from "../models/art.model";
import { FieldValues } from "react-hook-form";

export const uploadArt = async (data: FieldValues, exhibitionId: string) => {
  const uploadData = { exhibitionId: exhibitionId, ...data }
  const { data: arts, error } = await api!.from('arts').upsert(snakecaseKeys(uploadData)).eq((data && data.id) ? 'id' : 'exhibition_id', (data && data.id) ? data.id : exhibitionId).eq('status', 'active')
    .select();
  return { art: returnOneArt(arts as Art[]), error: error };
}

export const deleteArt = async (id: string) => {
  const { data: arts, error } = await api!.from('arts').update({ status: 'deleted' }).eq('id', id).eq('status', 'active')
    .select();

  return { art: returnOneArt(arts as Art[]), error: error };
}

export const getArts = async (exhibitionId: string) => {
  const { data: arts, error } = await api!.from('arts').select().eq('exhibition_id', exhibitionId).eq('status', 'active');

  return { arts: camelcaseKeys(arts ?? [] as Art[]), error: error }
}

export const getArt = async (id: string, userId?: string) => {
  const { data: arts, error } = await api!.from('arts').select().eq('id', id).eq('status', 'active')[userId ? 'eq' : null]('user_id', userId);

  return { arts: returnOneArt(arts as Art[]), error: error };
}

function returnOneArt(arts: Art[]) {
  const [art] = arts ?? [] as Art[];
  return camelcaseKeys(art ?? {} as Art)
}