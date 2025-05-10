import {useState } from "react";

export function getRates() {
    const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    let rates;
    let error;

    fetch(BASE_URL)
        .then(response => response.json())
        .then(data => {
            if (data.conversion_rates){
                rates = data.conversion_rates;
            } else {
                error = "No se pudieron obtener las tasas de cambio";
            }
        })
        .catch(err => {
            error = "Error al obtener datos";
        });

    return { rates, error };
}