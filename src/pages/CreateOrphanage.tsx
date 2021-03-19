import React, { ChangeEvent, FormEvent } from "react";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import MapOrphanages from "../components/MapOrphanages";
import NavBar from '../components/NavBar'
import PinMap from "../components/orphanages-map/PinMap";
import api from "../services/api";

import '../styles/pages/create-orphanage.css';

export default function CreateOrphanage() {
  const { push: pushHistory } = useHistory();

  const [coordinates, setCoordinates] = React.useState<{ lat: number, lng: number }>();
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [opening_hours, setOpeningHours] = React.useState('');
  const [open_on_weekends, setOpenOnWeekends] = React.useState(true);
  const [images, setImages] = React.useState<{ file: File, preview: any }[]>([]);

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    const newImages = selectedImages.map((image) => {
      return { file: image, preview: URL.createObjectURL(image) }
    })

    setImages([
      ...images,
      ...newImages
    ])
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(coordinates?.lat));
    data.append('longitude', String(coordinates?.lng));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image.file)
    })

    await api.post('/orphanages', data); // TODO: tratar erros

    alert('Orfanato cadastrado com sucesso!')

    pushHistory('/orphanages');
  }

  return (
    <div id="page-create-orphanage">
      <NavBar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="map-container">
              <MapOrphanages
                options={{ gestureHandling: 'greedy', mapTypeControl: true, fullscreenControl: false }}
                handleOnClick={(event) => setCoordinates({ lat: event.lat, lng: event.lng })}
                center={{ lat: -3.6755994, lng: -39.3470484 }}
                zoom={15}
              >
                {coordinates && <PinMap lat={coordinates.lat} lng={coordinates.lng} />}
              </MapOrphanages>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {images.map(({ preview }) => {
                  return <img key={preview} src={preview} alt={preview} />
                })}
                <label htmlFor="images[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input type="file" id="images[]" onChange={handleSelectImages} accept="image/*" hidden multiple />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? "active" : ''} 
                  onClick={() => { setOpenOnWeekends(true) }}
                >
                  Sim 
                </button>
                <button 
                  type="button" 
                  className={!open_on_weekends ? "active" : ''} 
                  onClick={() => { setOpenOnWeekends(false) }}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
