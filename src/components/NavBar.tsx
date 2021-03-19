import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from "react-router-dom";
import mapMarkerImg from '../images/pin.svg';

import '../styles/components/sidebar.css'

export default function NavBar() {
  const { goBack } = useHistory();

  return (
    <div className='app-sidebar'>
      <Link to='/orphanages'>
        <img src={mapMarkerImg} alt="Happy" />
      </Link>

      <button type="button" onClick={goBack}>
        <FiArrowLeft size={24} color="#FFF" />
      </button>
    </div>
  )
}