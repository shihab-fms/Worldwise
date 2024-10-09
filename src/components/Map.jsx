/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import Button from "./Button";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCity } from "../contexts/CityContext";
import { useGeoLocaltion } from "../hooks/useGeoLocaltion";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const [mapPossition, setMapPossition] = useState([22.3657773, 91.8185325]);
  const { cities } = useCity();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocaltion();

  const [mapLat, mapLng] = useUrlPosition();

  // console.log(cities);

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPossition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapPossition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? "LOADING..." : "Use your position"}
      </Button>

      <MapContainer
        center={mapPossition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) =>
          city.position && city.position.lat && city.position.lng ? (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}>
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ) : null
        )}
        <ChangeCenter position={mapPossition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
