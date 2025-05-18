
const getUsers = async () => {
    try {
        const res = await fetch("/json/users.json");
        return await res.json();
    } catch (error) {
        console.error("Error cargando usuarios:", error);
        return [];
    }
}

export {getUsers}