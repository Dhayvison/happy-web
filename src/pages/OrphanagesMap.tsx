import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import MapOrphanages from '../components/MapOrphanages';
import AsideMap from '../components/orphanages-map/AsideMap';
import PinMap from '../components/orphanages-map/PinMap';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = React.useState([])

  React.useEffect(() => {
    api.get('/orphanages').then(
      (response) => {
        setOrphanages(response?.data);
        console.log(response.data);
      }
    )
  }, [])

  return (
    <div id="page-map">
      <AsideMap/>

      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <MapOrphanages center={{ lat: -3.6755994, lng: -39.3470484 }} options={{mapTypeControl: true, fullscreenControl: false}} >
          {orphanages.map(({id, name, latitude, longitude}) => {
            return (
              <PinMap
                key={id}
                lat={latitude}
                lng={longitude}
                text={name}
                id={id}
              />
            )
          })}
        </MapOrphanages>
        
        <Link to="/orphanages/create" className="create-orphanage">
          <FiPlus size={32} color="#fff" />
        </Link>
      </div>
    </div>
  );
}
