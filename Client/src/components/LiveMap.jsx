import React from "react";
import { GoogleMap, Marker,} from "@react-google-maps/api";

export default function LiveMap({ rider, restaurant }) {
  const center = rider || restaurant;

  return (
    <GoogleMap
      center={center}
      zoom={14}
      mapContainerStyle={{
        width: "100%",
        height: "400px",
      }}
    >
      {rider && <Marker position={rider} />}
      {restaurant && <Marker position={restaurant} />}
    </GoogleMap>
  );
}