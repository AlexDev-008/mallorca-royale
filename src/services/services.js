
const getUsers = async () => {
    try {
        const res = await fetch("/users.json");
        return await res.json();
    } catch (error) {
        console.error("Error cargando usuarios:", error);
        return [];
    }
}

const getReviews = async () => {
    try {
        const res = await fetch("/reviews.json");
        return await res.json();
    } catch (error) {
        console.error("Error cargando reviews:", error);
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

export {getUsers, getReviews, getRestaurants}