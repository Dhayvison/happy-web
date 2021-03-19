import React from "react";
// import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiNavigation } from "react-icons/fi";
import { useParams } from "react-router-dom";
import MapOrphanages from "../components/MapOrphanages";
import PinMap from "../components/orphanages-map/PinMap";
import NavBar from "../components/NavBar";
import api from "../services/api";
import { Orphanage as OrphanageType } from '../utils/types'

import '../styles/pages/orphanage.css';

export default function Orphanage() {
  const [activeImage, setActiveImage] = React.useState<number>(0);
  const [orphanage, setOrphanage] = React.useState<OrphanageType>();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    api.get(`/orphanages/${id}`).then((response) => {
      setOrphanage(response?.data)
      console.log(response?.data);
    })
  }, [id])

  return (
    <div id="page-orphanage">
      <NavBar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage?.images[activeImage].path} alt="Lar das meninas" />

          <div className="images">
            {orphanage?.images.map((image, index) => {
              return (
                <button key={image.id} className={index === activeImage ? "active" : ""} type="button" onClick={() => setActiveImage(index)}>
                  <img src={image.path} alt={orphanage.name} />
                </button>
              )
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage?.name}</h1>
            <p>{orphanage?.about}</p>

            <div className="map-container">
              {
                orphanage?.latitude &&
                orphanage?.longitude && (
                  <MapOrphanages zoom={17} center={{ lat: orphanage?.latitude, lng: orphanage?.longitude }} >
                    <PinMap text={orphanage?.name} lat={orphanage?.latitude} lng={orphanage?.longitude} />
                  </MapOrphanages>
                )
              }

              <a id='search-maps-routes' title='Ver rotas no Google Maps'
                href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FiNavigation size={20} color="#0089A5" />
              </a>

            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage?.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage?.opening_hours}
              </div>

              {orphanage?.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos fim de semana
                </div>
              ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                  Não Atendemos fim de semana
                  </div>
                )}

            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}