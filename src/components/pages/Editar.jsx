import React, { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useParams } from 'react-router-dom';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Editar = () => {
  const { formulario, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {

    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {

      setArticulo(datos.articulo);


    }

  };


  const editarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    let nuevoArticulo = formulario;

    // Guardar artículo en el backend
    const { datos } = await Peticion(`${Global.url}articulo/${params.id}`, "PUT", nuevoArticulo);


    if (datos.status === "success") {
      setResultado("guardado");

      // Subir la imagen si existe
      const fileInput = document.querySelector("#file");

      if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file0', fileInput.files[0]);

        const subida = await Peticion(`${Global.url}subir-imagen/${datos.articulo._id}`, "POST", formData, true);

        if (subida.datos.status === "success") {
          console.log("Imagen subida correctamente");
        } else {
          console.log("Error al subir la imagen");
          setResultado("error");
        }
      }
    } else {
      setResultado("error");
    }
    console.log(datos);
  }

  return (
    <div className='jumbo'>
      <h1>Editar artículo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>

      <strong>{resultado === "guardado" ? "Artículo guardado con éxito" : ""}</strong>
      <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>

      <form className='formulario' onSubmit={editarArticulo}>
        <div className='form-group'>
          <label htmlFor='titulo'>Título</label>
          <input type="text" name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea name='contenido' onChange={cambiado} defaultValue={articulo.contenido} />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>

          <div className='mascara'>
            {articulo.imagen !== "default.png"
              ? <img src={Global.url + "imagen/" + articulo.imagen} alt={articulo.titulo} />
              : <img src='https://lineadecodigo.com/wp-content/uploads/2014/04/javascript.png' alt={articulo.titulo} />}
          </div>


          <input type="file" name='file0' id='file' />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
}
