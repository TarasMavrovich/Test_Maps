import { InfoWindow } from "@react-google-maps/api";
import React from "react";

export const InfoSelect = ({ marker, updateMarker, deleteMarker }) => {
  const handleDeleteClick = () => {
    deleteMarker(marker.label);
  };
  return (
    <InfoWindow
      position={marker.position}
      onCloseClick={() => updateMarker(null)}
    >
      <div>
        <h2>Marker {marker.label}</h2>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </InfoWindow>
  );
};
