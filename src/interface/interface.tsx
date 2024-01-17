export interface CustomMarker {
  position: { lat: number; lng: number };
  label: string;
}

export interface MarkerMapProps {
  marker: CustomMarker;
  setMarker: React.Dispatch<React.SetStateAction<Array<CustomMarker>>>;
  updateMarker: React.Dispatch<React.SetStateAction<null | CustomMarker>>;
}
