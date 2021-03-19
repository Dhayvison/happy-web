import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Logo from '../images/logo.svg';

import '../styles/pages/landing.css';

export default function Landing() {
  return (
    <div id='page-landing'>
      <div className="content-wrapper">
        <img src={Logo} alt="Happy" />
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças</p>
        </main>
        <div className="location">
          <strong>Umirim</strong>
          <span>Ceará</span>
        </div>
        <Link to="/orphanages" className='enter-app'>
          <FiArrowRight size={26} color='rgba(0, 0, 0, 0.6)' />
        </Link>
      </div>
    </div>
  );
}