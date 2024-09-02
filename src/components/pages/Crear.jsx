import React from 'react';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Crear = () => {

  const {formulario, enviado, cambiado} = useForm({});

  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async(e) => {
    e.preventDefault();


    //recoger datos formularios
    let nuevoArticulo = formulario;

    //guardar articulos en el backen
    const {datos, cargando} = await Peticion(Global.url+"crear", "POST", nuevoArticulo);

    if(datos.status === "success"){

      setResultado("guardado");

    }else{

      setResultado("error");

    }
    console.log(datos);

  }


  return (
    <div className='jumbo'>
      <h1>Crear articulo</h1>
      <p>Formulario para crear articulo </p>
     

      <strong> {resultado == "guardado"? "articulo guardado con exito" : ""} </strong>
      <strong> {resultado == "error"? "Los datos proporcionados son incorrectos" : ""} </strong>

      {/*Montar formulariuoo */}

      <form className='formulario' onSubmit={guardarArticulo}>

        <div className='form-group'>
          <label htmlFor='titulo'>Titulo</label>
          <input type="text" name='titulo'  onChange={cambiado}/>
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>contenido</label>
          <textarea type="text" name='contenido' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>imagen</label>
          <input type="file" name='file0'  id='file'/>
        </div>

        <input type="submit" value="guardar" className="btn btn-success" id="" />
      </form>

    </div>
  )
}
