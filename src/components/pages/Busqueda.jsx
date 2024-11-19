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
    conseguirArticulos();
  }, [params]); // Se ejecutará cada vez que cambien los parámetros de la ruta.

  const conseguirArticulos = async () => {
    try {
      const { datos } = await Peticion(Global.url + "buscar/" + params.busqueda, "GET");

      if (datos.status === "success") {
        setArticulos(datos.articulos);
      } else {
        setArticulos([]);
      }
    } catch (error) {
      console.error("Error al obtener los artículos:", error);
      setArticulos([]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {cargando ? (
        <p>Cargando...</p>
      ) : articulos.length >= 1 ? (
        <Listado articulos={articulos} setArticulos={setArticulos} />
      ) : (
        <h1>No hay artículos</h1>
      )}
    </>
  );
};
