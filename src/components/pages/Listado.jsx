import React from 'react';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Link } from 'react-router-dom';

export const Listado = ({ articulos, setArticulos }) => {

  const eliminar = async (id) => {
    try {
      let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");

      if (datos.status === "success") {
        // Filtra los artículos eliminando el que tiene el id
        const articulosActualizados = articulos.filter(articulo => articulo._id !== id);

        // Forzar React a re-renderizar clonando el array
        setArticulos([...articulosActualizados]); // Esto debe causar un re-render
      }
    } catch (error) {
      console.error("Error eliminando el artículo:", error);
    }
  };

  return (
    <div>
      {articulos.length === 0 ? (
        <p>No hay artículos para mostrar.</p>
      ) : (
        articulos.map(articulo => (
          <article key={articulo._id} className="articulo-item">
            <div className='mascara'>
              {articulo.imagen !== "default.png" 
                ? <img src={Global.url + "imagen/" + articulo.imagen} alt={articulo.titulo} />
                : <img src='https://lineadecodigo.com/wp-content/uploads/2014/04/javascript.png' alt={articulo.titulo} />}
            </div>
            <div className='datos'>
              <h3 className="title"><Link to={"/articulo/"+articulo._id}>{articulo.titulo}</Link></h3>
              <p className="description">{articulo.contenido}</p>
              <button className="edit">Editar</button>
              <button className="delete" onClick={() => eliminar(articulo._id)}>Borrar</button>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
