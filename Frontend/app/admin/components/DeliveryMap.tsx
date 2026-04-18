"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function DeliveryMap() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">

      <h2 className="font-semibold mb-4">Live Deliveries</h2>

      <MapContainer
        center={[6.5244, 3.3792] as any}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[6.5244, 3.3792]} />
      </MapContainer>

    </div>
  );
}