import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import axios from 'axios';

const apiOptions = { baseURL: 'http://localhost:3000' };

const myIcon = new Icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
});

const MapLocation = () => {
  const [persons, setPersons] = useState<any>([]);

  useEffect(() => {
    axios
      .get('/api.json', apiOptions)
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const points: any[] = persons.map((person: any) => {
    return [person['Gps-Location'].Latitude, person['Gps-Location'].Longitude];
  });

  const center: LatLngExpression = points[0] || [
    30.363232386286573, 48.27536900135166,
  ];

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
