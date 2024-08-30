export const Peticion = async (url, metodo, datosGuardar = "") => {
    let datos = [];
    let cargando = true;

    let opciones = {
        method: "GET"
    };

    if (metodo === "GET" || metodo === "DELETE") {
        opciones = {
            method: metodo
        };
    }

    if (metodo === "POST" || metodo === "PUT") {
        try {
            opciones = {
                method: metodo,
                body: JSON.stringify(datosGuardar),
                headers: {
                    "Content-Type": "application/json"
                }
            };
        } catch (error) {
            console.error("Error al serializar los datos:", error);
        }
    }

    try {
        const peticion = await fetch(url, opciones);
        datos = await peticion.json();
    } catch (error) {
        console.error("Error al hacer la petición:", error);
    }

    cargando = false;

    return {
        datos,
        cargando
    };
};
