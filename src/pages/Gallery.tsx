import React, { useEffect, useState } from 'react';
import { getGallery } from '../services/gallery';
import { getExhibitions } from '../services/exhibition';
import { ExhibitionTile } from '../modules/exhibition';
import { useParams } from 'react-router-dom';

const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState(null);
  const [exhibitions, setExhibitions] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    getGallery({ galleryName: name.toString() }).then(({ gallery }) => {
      setGallery(gallery)
      if (gallery.id) {
        getExhibitions(gallery.id).then(({ exhibitions }) => setExhibitions(exhibitions));
      }
    });
  }, []);


  return gallery && exhibitions && <>
    <h1>{gallery.fullName}</h1>
    <div className="grid space-2 gutter-2">
      {exhibitions.map(exhibition => <ExhibitionTile key={exhibition.id} exhibition={exhibition} gallery={gallery} />)}
    </div>
  </>
}

export default Gallery;