import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Crear = () => {
  const { formulario, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    let nuevoArticulo = formulario;

    // Guardar artículo en el backend
    const { datos } = await Peticion(`${Global.url}crear`, "POST", nuevoArticulo);

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
      <h1>Crear artículo</h1>
      <p>Formulario para crear artículo</p>

      <strong>{resultado === "guardado" ? "Artículo guardado con éxito" : ""}</strong>
      <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>

      <form className='formulario' onSubmit={guardarArticulo}>
        <div className='form-group'>
          <label htmlFor='titulo'>Título</label>
          <input type="text" name='titulo' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea name='contenido' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <input type="file" name='file0' id='file' />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
}
