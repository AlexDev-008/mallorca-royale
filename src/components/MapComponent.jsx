import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useEffect} from "react";

export const MapComponent = ({ latitude = [], longitude = [], hotelNames = [] }) => {

    const getAverage = (arr) => {
        const sum = arr.reduce((acc, val) => acc + val, 0);
        return sum / arr.length;
    };

    return (
        <MapContainer
            center={latitude.length > 0 ? [getAverage(latitude), getAverage(longitude)] : 0}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {
                latitude.length > 0 &&
                latitude.map((lat, i) => (
                    <Marker position={[lat, longitude[i]]}>
                        <Popup>
                            Hotel: <br /> {hotelNames[i]}
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    );
};