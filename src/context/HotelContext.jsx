import {createContext, useContext, useEffect, useState} from "react";

const HotelsContext = createContext();

export const useHotels = () => {
    return useContext(HotelsContext);
};

export const HotelsProvider = ({ children }) => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetch("/hotels.json")
            .then(res => res.json())
            .then(data => setHotels(data))
            .catch((error) => console.error("Error cargando hoteles:", error));
    }, []);

    return (
        <HotelsContext.Provider value={{ hotels, setHotels }}>
            {children}
        </HotelsContext.Provider>
    );
};