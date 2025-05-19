
const getUsers = async () => {
    try {
        const res = await fetch("/json/users.json");
        return await res.json();
    } catch (error) {
        console.error("Error cargando usuarios:", error);
        return [];
    }
}

const getRestaurants = async () => {
    try {
        const res = await fetch("https://www.bresmi.com/JSON/restaurantes.json");
        return await res.json();
    } catch (error) {
        console.error("Error cargando restaurantes:", error);
        return [];
    }
}

export {getUsers, getRestaurants}