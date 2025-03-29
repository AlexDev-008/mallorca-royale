import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useEffect} from "react";

export const MapComponent = ({ latitude, longitude }) => {

    const getAverage = (arr) => {
        const sum = arr.reduce((acc, val) => acc + val, 0);
        return sum / arr.length;
    };

    return (
        <MapContainer
            center={[getAverage(latitude), getAverage(longitude)]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {
                latitude.map((lat, i) => (
                    <Marker position={[lat, longitude[i]]}>
                        <Popup>
                            Ubicación seleccionada: <br /> Lat: {lat}, Lng: {longitude[i]}
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    );
};