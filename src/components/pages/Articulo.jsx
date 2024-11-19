
import React, { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';
import { useParams } from 'react-router-dom';


export const Articulo = () => {


  const [articulo, setArticulo] = useState({});

  const [cargando, setCargando] = useState(true);

  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {

    const { datos, cargando } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {

      setArticulo(datos.articulo);

      setCargando(false);
    }

  };

  return (
    <div className='jumbo'>
      {
        cargando ? "Cargando..." :



          <>

            <div className='mascara'>
              {articulo.imagen !== "default.png"
                ? <img src={Global.url + "imagen/" + articulo.imagen} alt={articulo.titulo} />
                : <img src='https://lineadecodigo.com/wp-content/uploads/2014/04/javascript.png' alt={articulo.titulo} />}
            </div>
            <h1>{articulo.titulo}</h1>
            <span>{articulo.fecha}</span>
            <p>{articulo.contenido}</p>
          </>


      }

    </div>
  );
};
