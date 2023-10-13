import React from 'react';
import RoomGallery from 'room-gallery';

const Exhibition: React.FC = () => {
  return <RoomGallery fetch={'data.json'} />
}

export default Exhibition;
