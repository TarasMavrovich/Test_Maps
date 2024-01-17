import { Marker } from "@react-google-maps/api";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase.tsx";
import { MarkerMapProps } from "../interface/interface.tsx";

export const MarkerMap: React.FC<MarkerMapProps> = ({
  marker,
  setMarker,
  updateMarker,
}) => {
  const handleMarkerClick = () => {
    updateMarker(marker);
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const draggedMarker = {
        ...marker,
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      };

      setMarker((prevMarkers) =>
        prevMarkers.map((prevMarker) =>
          prevMarker.label === draggedMarker.label ? draggedMarker : prevMarker
        )
      );

      updateQuestRecord(draggedMarker.label, draggedMarker.position);
    }
  };

  const updateQuestRecord = async (
    label: string,
    newPosition: { lat: number; lng: number }
  ) => {
    try {
      await updateDoc(doc(db, "quests", label), {
        Location: newPosition,
        Timestamp: serverTimestamp(),
      });

      console.log("Quest Record updated:", label);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <Marker
      key={marker.label}
      position={marker.position}
      label={marker.label}
      onClick={handleMarkerClick}
      onDragEnd={handleMarkerDragEnd}
      draggable
    />
  );
};
