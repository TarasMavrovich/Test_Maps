import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Map } from "./Map/Map.tsx";
import { API_KEY } from "./apiKey/apiKey.jsx";

const App: React.FC = () => {
  if (!API_KEY) {
    console.error(
      "Google Maps API key is not defined. Please check your apiKey.jsx file."
    );
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY || "",
  });

  return <div>{isLoaded ? <Map /> : <h2>Loading...</h2>}</div>;
};

export default App;
