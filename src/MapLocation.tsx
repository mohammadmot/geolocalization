import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import api from './api.json';

const myIcon = new Icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
});

const points: any[] = api.map((person) => {
  return [person['Gps-Location'].Latitude, person['Gps-Location'].Longitude];
});

const center: LatLngExpression = points[0];

const MapLocation = () => {
  return (
    <MapContainer
      className="Map"
      center={center}
      zoom={11}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point, index) => {
        return (
          <Marker key={index} position={point} icon={myIcon}>
            <Popup>{index}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapLocation;
