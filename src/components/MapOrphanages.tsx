import React, { BaseSyntheticEvent, ReactNode } from 'react';
import GoogleMapReact, { MapOptions } from 'google-map-react';

type OnClickMapProps = { 
  x: number, 
  y: number, 
  lat: number, 
  lng: number, 
  event: BaseSyntheticEvent 
}

type MapProps = {
  center?: {
    lat: number,
    lng: number
  }
  zoom?: number,
  children?: ReactNode,
  options?: MapOptions,
  handleOnClick?: (event: OnClickMapProps) => void,
}

export default function MapOrphanages({ center, zoom, children, options, handleOnClick }: MapProps) {
  return (
    <GoogleMapReact
      onClick={handleOnClick}
      bootstrapURLKeys={{ key: process.env.REACT_APP_API_GOOGLE_MAPS_KEY ?? '' }}
      defaultCenter={center}
      defaultZoom={zoom ?? 13}
      yesIWantToUseGoogleMapApiInternals
      options={options}
    >
      {children}
    </GoogleMapReact>
  );
}