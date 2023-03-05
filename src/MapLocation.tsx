import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import axios from 'axios';

const defaultCenter: [number, number] = [30.363232386286573, 48.27536900135166];

const myIcon = new Icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
});

const api = axios.create({
  baseURL: 'https://devgat.aranuma.com',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyMURCNEZCQzAyN0VBNEMwQjRBNzkwRkYwMURBQjQ4RDlDMjNFNUUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiIwaDIwLThBbjZrd0xTbmtQOEIyclNObkNQbDQifQ.eyJuYmYiOjE2Nzc1ODU2OTksImV4cCI6MTcwOTEyMTY5OSwiaXNzIjoiaHR0cHM6Ly9kZXZpZHMuYXJhbnVtYS5jb20iLCJhdWQiOiJhcmFfcHJveHlfYXBpIiwiY2xpZW50X2lkIjoicHdhIiwic3ViIjoiM2JkZTIxZTgtOWZlMy00NzE2LWI3MGItNzNjZjFjOWEzMjQ3IiwiYXV0aF90aW1lIjoxNjc3NTg1Njk5LCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJBZG1pbiIsItmF2K_bjNixINm-2LHZiNqY2Ycg2b7Yp9uM2KfZgdmI2YTYp9ivIiwidGVzdCJdLCJUZW5hbnRzIjoiZjQ5YTlhMWItYTU0My00NWNhLWViYzAtMDhkYWQ3NzMzNDhmIiwic2NvcGUiOlsiZW1haWwiLCJvcGVuaWQiLCJwcm9maWxlIiwiYXJhX3Byb3h5X2FwaV9zY29wZSJdLCJhbXIiOlsicHdkIl19.BhjLld4ilUS-cjEgAvyTmho5pwa0yvz1gkjommj55A8HHEmdNDc60seUazp5H4u1El2TDCX5YlZXornOIriS1yfNHc8H_qCSaY__TeuRWw7D7QTfI-znw_b38RYbf0VTGSeeCigjHhi6Cbft6ci88je2Ud72Ytc8QL8dOqgIb3FhKetQcnTUissjttDmw3PUt_BzytkxRkS6_M0b5GhrTDQDheQuaCXBRbRlC6A4ES-NfyOkUbz3xusbl3f-xkydeNCMYH9OqhZnWeBfppcBI1W95h_Aq6pKbQqAbK2XVCdQ6lWITIZhpg-COTjSER0iu_9WB_V98_OnAa6-A05Etg',
  },
});

const MapLocation = () => {
  const [ids, setIds] = useState<number[]>([]);
  const [persons, setPersons] = useState<any>([]);

  useEffect(() => {
    api
      .get('/LBM/GetAllIDs')
      .then((response) => {
        setIds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const personPromises = ids.map(async (id: any) => {
      const response = await api.get('/LBM/GetAllParameters', {
        params: { ID: id },
      });
      return response.data;
    });
    Promise.all(personPromises).then((persons) => {
      setPersons(persons);
    });
  }, [ids]);

  return (
    <MapContainer
      className="Map"
      center={defaultCenter}
      zoom={11}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {persons.map(({ personelID, gpsLocation }: any, index: number) => {
        return (
          <Marker
            key={index}
            position={[gpsLocation.latitude, gpsLocation.longitude]}
            icon={myIcon}
          >
            <Popup>{personelID}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapLocation;
