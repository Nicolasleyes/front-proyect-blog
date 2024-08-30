import React, { useState, useEffect } from 'react';

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    const url = "http://localhost:3900/api/articulos";
    let peticion = await fetch(url, {
      method: "GET"
    });

    let datos = await peticion.json();

    console.log(datos);

    if (datos.status === "success") {
      setArticulos(datos.articulos); // Aquí está corregido
    }
  };

  return (
    <>
      {
        articulos.length >= 1 ? (
          articulos.map(articulo => (
            <article key={articulo._id} className="articulo-item">
              <div className='mascara'>
                <img src='https://lineadecodigo.com/wp-content/uploads/2014/04/javascript.png' alt={articulo.titulo} />
              </div>
              <div className='datos'>
                <h3 className="title">{articulo.titulo}</h3>
                <p className="description">{articulo.contenido}</p>
                <button className="edit">Editar</button>
                <button className="delete">Borrar</button>
              </div>
            </article>
          ))
        ) : (
          <h1>No hay artículos</h1>
        )
      }

    </>
  );
};
