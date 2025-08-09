import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';


const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41],  
});
L.Marker.prototype.options.icon = DefaultIcon;

function ClinicMap({ lat, lng }) {
  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>Đây là vị trí phòng khám</Popup>
      </Marker>
    </MapContainer>
  );
}

export default ClinicMap;
