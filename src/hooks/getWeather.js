
export const getWeather = (lat, lon) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error("Error fetching weather data:", error));
};