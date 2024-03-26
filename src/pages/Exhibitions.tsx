import React, { useEffect, useState } from 'react';
import { getExhibitions } from '../services/exhibition';
import { ExhibitionTile } from '../modules/exhibition';

const Galleries: React.FC = () => {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    getExhibitions().then(({ exhibitions }) => setExhibitions(exhibitions));
  }, []);


  return exhibitions && <>
    <div className="grid space-2 gutter-2">
      {exhibitions.map(exhibition => <ExhibitionTile key={exhibition.id} exhibition={exhibition} />)}
    </div>
  </>
}

export default Galleries;