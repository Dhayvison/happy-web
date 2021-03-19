import React from 'react'
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Pin from '../../images/pin.svg';

import '../../styles/components/pin-map.css'

type PinMapProps = { 
  text?: string, 
  id?: string, 
  lat?: number,
  lng?: number
}

export default function PinMap({ text, id } : PinMapProps) {
  const [showDetails, setShowDetails] = React.useState(false);
  
  return (
    <div 
      className='marker' 
      onMouseOver={() => { setShowDetails(true) }} 
      onMouseLeave={() => { setShowDetails(false) }}
    >
      {showDetails && text &&
        <div className='marker-details'>
          <h2 className='marker-details-title'>{text}</h2>
          {id && <Link to={`/orphanages/${id}`}><FiArrowRight size={15} color="#fff" /></Link>}
        </div>
      }
      
      <img className='marker-icon' src={Pin} width='34' height='44' alt="Happy" />
    </div>
  )
};