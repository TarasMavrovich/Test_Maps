import { GoogleMap } from "@react-google-maps/api";
import React, { useCallback, useRef, useState } from "react";
import { MarkerMap } from "../Marker/Marker.tsx";
import { addQuestRecord } from "../firebase.tsx";
import { InfoSelect } from "../Info/info.tsx";
import { CustomMarker } from "../interface/interface.tsx";
import {
  containerStyle,
  center,
  defaultOptions,
} from "../Options/defaultOptionsMap.tsx";
import styles from "./map.module.css";
import { AuthProvider } from "../auth.tsx";

export const Map: React.FC = () => {
  const [markers, setMarkers] = useState<CustomMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<CustomMarker | null>(
    null
  );

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = {
        position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        label: `${markers.length + 1}`,
      };

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      await addQuestRecord(newMarker.position);
    }
  };

  const deleteMarker = (label: string) => {
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.label !== label)
    );
    setSelectedMarker(null);
  };

  const deleteAllMarkers = () => {
    setMarkers([]);
    setSelectedMarker(null);
  };

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
  }, []);

  return (
    <div>
      <AuthProvider />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={defaultOptions}
      >
        {markers.map((marker, index) => (
          <MarkerMap
            key={index}
            marker={marker}
            setMarker={setMarkers}
            updateMarker={setSelectedMarker}
          />
        ))}

        {selectedMarker && (
          <InfoSelect
            marker={selectedMarker}
            updateMarker={setSelectedMarker}
            deleteMarker={deleteMarker}
          />
        )}

        {markers.length > 0 && (
          <div>
            <button className={styles.delete_marker} onClick={deleteAllMarkers}>
              Delete All Markers
            </button>
          </div>
        )}
      </GoogleMap>
    </div>
  );
};
