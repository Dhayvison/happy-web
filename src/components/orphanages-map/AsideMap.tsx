import React from 'react'
import { Link } from 'react-router-dom';

import PinMapIcon from '../../images/pin.svg';

import '../../styles/components/aside-map.css'

export default function AsideMap() {
  return (
    <div className='aside-map'>
      <header>
        <Link to='/'>
          <img src={PinMapIcon} alt="Happy" />
        </Link>

        <h2>Escolha um orfanato no mapa</h2>
        <p>Muitas crianças estão esperando a sua visita :)</p>
      </header>

      <footer>
        <strong>Umirim</strong>
        <span>Ceará</span>
      </footer>
    </div>
  );
}