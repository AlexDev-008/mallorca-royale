import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapComponent = ({ latitude, longitude }) => {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    Ubicación seleccionada: <br /> Lat: {latitude}, Lng: {longitude}
                </Popup>
            </Marker>
        </MapContainer>
    );
};