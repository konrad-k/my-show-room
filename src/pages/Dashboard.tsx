import React, { useEffect, useState } from 'react';
import { useSessionUserContext } from '../contexts/SessionUser';
import { Profile } from '../modules/profile';
import { getGalleries } from '../services/gallery';
import { GalleryTile } from '../modules/gallery';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { sessionUser } = useSessionUserContext();
  const profile = new Profile(sessionUser?.profile);
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    getGalleries(sessionUser?.user.id).then(({ galleries }) => setGalleries(galleries));
  }, []);

  if (!profile.firstName || !profile.lastName) {
    return <Navigate to="/profile" />;
  }

  return <>
    <h1>Welcome on dashboard {profile.fullName() || 'art lover'}</h1>
    <h2>Your galleries</h2>
    <div className="grid space-2 gutter-2">
      {galleries.map(gallery => <GalleryTile key={gallery.id} gallery={gallery} />)}
    </div>
  </>
}

export default Dashboard;
