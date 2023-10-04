import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

const Map = () => {
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <h1>Map</h1>
      <p>
        Position: {lat} {lng}
      </p>
    </div>
  );
};

export default Map;
