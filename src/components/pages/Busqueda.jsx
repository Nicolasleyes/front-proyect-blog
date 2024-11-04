import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Busqueda = () => {


  const [articulos, setArticulos] = useState([]);

  const [cargando, setCargando] = useState(true); 

  const params = useParams();

  useEffect(() => {
    console.log(params)
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {

    const { datos, cargando } = await Peticion(Global.url + "articulos  ", "GET");

    if (datos.status === "success") {
      setArticulos(datos.articulos); 

      setCargando(false);
    }
    
  };

  return (
    <>
    {
      cargando ? "Cargando..." : 
    
      articulos.length >= 1 ?  <Listado articulos={articulos} setArticulos={setArticulos}/> 
      : <h1>No hay artículos</h1>
        
      
    }

    </>
  );
};
