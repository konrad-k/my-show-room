import React from 'react';
import RoomGallery from 'react-room-gallery';

const Exhibition: React.FC = () => {
  return <RoomGallery fetchUrl={'/data.json'}/>
}

export default Exhibition;
