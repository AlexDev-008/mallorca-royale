import { useEffect, useState } from "react";

export function useExchangeRates() {
    const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    const [rates, setRates] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => {
                if (data.conversion_rates) {
                    setRates(data.conversion_rates);
                } else {
                    setError("No se pudieron obtener las tasas de cambio");
                }
            })
            .catch(err => {
                setError("Error al obtener datos");
            });
    }, []);

    return { rates, error };
}