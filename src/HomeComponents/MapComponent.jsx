"use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapComponent = ({ mapKey, filteredPlants, getColor, getInitial }) => {
  const getMarkerIcon = (type) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${getColor(type)}; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
               <span style="color: white; font-weight: bold; font-size: 16px;">${getInitial(type)}</span>
             </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  return (
    <MapContainer
      key={mapKey}
      center={[28.6139, 77.2090]}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {filteredPlants.map((plant) => (
        <Marker
          key={plant.id}
          position={[plant.lat, plant.lng]}
          icon={getMarkerIcon(plant.type)}
        >
          <Popup className="custom-popup">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">{plant.name}</h3>
              <p className="text-sm"><span className="font-medium">Capacity:</span> {plant.capacity} MW</p>
              <p className="text-sm"><span className="font-medium">Type:</span> {plant.type}</p>
              <p className="text-sm"><span className="font-medium">Status:</span> <span className="capitalize">{plant.status}</span></p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent; 