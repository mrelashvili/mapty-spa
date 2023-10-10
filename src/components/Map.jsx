import { useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

const Map = () => {
  // const navigate = useNavigate();
  const [mapPosition] = useState([40, 0]);
  const { cities } = useCities();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  console.log(lat, lng);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
