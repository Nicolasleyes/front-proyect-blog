export const Peticion = async (url, metodo, datosGuardar = "", archivos = false) => {
    let datos = [];
    let cargando = true;

    let opciones = {
        method: metodo
    };

    if (metodo === "POST" || metodo === "PUT") {
        try {
            if (archivos) {
                // Se asume que datosGuardar es un FormData si archivos es true
                opciones.body = datosGuardar;
            } else {
                opciones.body = JSON.stringify(datosGuardar);
                opciones.headers = {
                    "Content-Type": "application/json"
                };
            }
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
