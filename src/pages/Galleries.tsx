import React, { useEffect, useState, useCallback } from 'react';
import { getGalleries } from '../services/gallery';
import { GalleryTile } from '../modules/gallery';
import { GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const Galleries: FC = () => {
  const [galleries, setGalleries] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [center, setCenter] = useState(null);


  

  useEffect(() => {
    getGalleries().then(({ galleries }) => setGalleries(galleries));
  }, []);

  useEffect(() => {
    setCenter(calculateCenter(galleries));

  }, [galleries]);

   const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    
    galleries.forEach(gallery => {
      if (gallery.latitude && gallery.longitude) {
        bounds.extend({ lat: gallery.latitude, lng: gallery.longitude });
      }
    });
    map.fitBounds(bounds);
    setMap(map)
  }, [galleries])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleShowMap = () => {
    setShowMap(!showMap);
  }

  const calculateCenter = (galleries) => {
    const latitudes = galleries.map(gallery => gallery.latitude);
    const longitudes = galleries.map(gallery => gallery.longitude);

    const centerLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
    const centerLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

    return { lat: centerLat, lng: centerLng };
  }


  return galleries && center && <div>
    <h2 className="items items-stretch margin-top-3">
      <span>All Galleries</span>
      <button className="button button-primary button-xs" onClick={handleShowMap}>{showMap ? 'Hide map' : 'Show on map'}</button>
    </h2>
      { isLoaded && showMap ? (
        <div className="has-map">
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {
              galleries.map(gallery => (gallery.latitude && gallery.longitude) &&
                <MarkerF position={{ lat: gallery.latitude, lng: gallery.longitude }} visible={true} />
              )
            }
          </GoogleMap>
          </div>
        ) : <></>
    }

    <div className="grid space-2 gutter-2">
      {galleries.map(gallery => <GalleryTile key={gallery.id} gallery={gallery} />)}
    </div>
  </div>
}

export default Galleries;