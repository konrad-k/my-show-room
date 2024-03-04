import React from 'react';
import RoomGallery from 'room-gallery';
import { getArts } from '../services/art';
import { useParams } from 'react-router-dom';

const Exhibition: React.FC = () => {
  const { id } = useParams();

  const dataFetch = async () => {
    const { arts } = await getArts(id);
    return arts.map(art => { return { id: art.id, image: art.imageUrl, description: art.description } });
  }

  return <RoomGallery fetch={dataFetch} />
}

export default Exhibition;
