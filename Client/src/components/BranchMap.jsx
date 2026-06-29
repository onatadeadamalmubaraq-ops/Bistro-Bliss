import React from 'react';
import {
  GoogleMap,
  Marker,
  LoadScript,
} from "@react-google-maps/api";

const center = {
  lat: 11.8464,
  lng: 13.1603,
};

export default function BranchMap() {
  return (
    <LoadScript
      googleMapsApiKey={
        import.meta.env.VITE_GOOGLE_MAPS_KEY
      }
    >
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}