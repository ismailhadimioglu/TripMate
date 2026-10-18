import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function MapView({ places, picked, onPick }) {
  const located = places.filter((p) => p.lat != null && p.lng != null);
  const center = located.length ? [located[0].lat, located[0].lng] : [39, 35];
  const zoom = located.length ? 10 : 5;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-80 w-full rounded-lg"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onPick={onPick} />
      {located.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>{p.name}</Popup>
        </Marker>
      ))}
      {picked && (
        <Marker position={[picked.lat, picked.lng]}>
          <Popup>Seçilen konum</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapView;